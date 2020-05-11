const Promise = require('bluebird-extra'),
	path = require('path'),
	fs = require('fs'),
	_ = require('lodash'),
	TAG = '',
	unlink = Promise.promisify(fs.unlink, fs),
	logger = require('../logger/index').logger,
	AWS = require('aws-sdk'),
	config = require('../config');

const customException  = require('../customException');


AWS.config = {
	accessKeyId: config.cfg.iamUser.keyId,
	secretAccessKey: config.cfg.iamUser.accessKey,
	bucketName: config.cfg.s3.bucketName,
	region: config.cfg.s3.region,
	signatureVersion: config.cfg.s3.signatureVersion
};

var Bucket = config.cfg.s3.bucketName;
var s3 = new AWS.S3({params: {Bucket: Bucket}});
var seq = new Date().getTime();

function _fetchFilesFromReq(request){
	if(request.file){
		return [request.file];
	}
	else if(request.files){
		return request.files;
	}
	else{
		//No Data
	}
}

/*function _fetchMultipleFilesFromReq(request, keys){
	if(request.file){
		return [ request.file ];
	}
	else if(request.files){
		var filesArr = [];
		keys.forEach(function(key){
			if(request.files[key]){
				filesArr.push(request.files[key][0]);
			}
		})
		return filesArr;
	}
	else{
		//No Data
	}
}*/

function __deleteFiles(filePathList){
	var promiseArray = [];

	_.each( _.uniq(filePathList), function(path){
		promiseArray.push(unlink(path));
	});

	Promise.all(promiseArray).then(() => logger.info(TAG , "All files deleted successfully."))
		.catch(error => logger.error(error));
}

function uploadSingleMediaToS3(){
	return function(request, response, next){
		var files = _fetchFilesFromReq(request);
		if(!files){
			return next();
		}

		return new Promise(function(resolve, reject){
			var file = files[0];
			var params = {
                            Bucket:config.cfg.s3.bucketName, 
                            Key:String(file.filename), 
                            Body:fs.createReadStream(file.path), 
                            ACL:config.cfg.s3.ACL
                        };
			s3.upload(params, function(error, data){
				if(data){
                                    request.body.location = data.Location;
				}
				__deleteFiles(_.map(files, 'path'));
				next();
			});
		});
	}
}

function _uploadToS3(file, buffer){
	return new Promise(function(resolve, reject){
		s3.upload({
			Key: file.filename,
			ContentType: file.mimetype,
			Body: buffer,
			ACL: config.cfg.s3.ACL
		}, function(error, data){
			if(error){
				console.log("Upload failed: ", error);
				reject(error);
			}
			else{
				resolve(data);
			}
		});
	});
}

function uploadMultipleMediaToS3(){
	return function(request, response, next){
		var files = _fetchFilesFromReq(request);
		if(!files){
			return next();
		}

		Promise.mapSeries(files, function(file){
			return _uploadToS3(file.path, file.fieldname);
		})
		.then(function(urls){
			let location = [];
			urls.forEach(function(url){
				if(url.field){
					location.push(url.location);
				}
			})
			request.body.location = location;
			__deleteFiles(_.map(files, 'path'));
			next();
		})
		.catch(function(error){
			throw error;
		});
	}
}


// ========================== Export Module Start ==========================
module.exports = {
	uploadSingleMediaToS3,
	uploadMultipleMediaToS3
}
// ========================== Export Module End ============================