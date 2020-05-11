"use strict";

//========================== Load Modules Start =======================
//========================== Load External modules ====================
const Promise = require("bluebird");
const AWS = require('aws-sdk');
const fs = require("fs");
const path = require("path");
//========================== Load internal modules ====================
const constants = require("../constants");
const options = require('../config/index');

AWS.config = {
    accessKeyId: options.cfg.iamUser.keyId,
    secretAccessKey: options.cfg.iamUser.accessKey,
    //region: options.cfg.s3.region,
    bucketName: options.cfg.s3.bucketName,
    signatureVersion: options.cfg.s3.signatureVersion,
};
var Bucket = options.cfg.s3.bucketName;
var photoBucket = new AWS.S3({params: {Bucket: Bucket}});


//========================== Load Modules End ==============================================
function __deleteTempFile(filePath) {
    fs.stat(filePath, function (err, stats) {
        //console.log(stats);//here we got all information of file in stats variable

        if (err) {
            console.error(err);
        }

        fs.unlink(filePath, function (err) {
            if (err) {
                console.log(err);
            }
            console.log('file deleted successfully');
        });
    });
};

function __uploadToS3(file, buffer) {
    return new Promise(function (resolve, reject) {
        photoBucket.upload({
            Key: file.filename,
            ContentType: file.mimetype,
            Body: buffer,
            ACL: 'public-read'
        }, function (err, data) {
            if (err) {
                console.log("upload fail: ",err);
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}


function uploadFile(file) {
    let buffer = fs.createReadStream(file.path);
    return __uploadToS3(file, buffer)
        .then(function (data) {
            __deleteTempFile(file.path);
            return data
        })
}

function uploadImageThumb(file) {
    let size = 128;
    let dest = path.join(file.path, "../");
    let resizeName = size + "x" + size + file.filename;
    dest += resizeName;
    return new Promise(function (resolve, reject) {

        gm(file.path)
            .resize(size, size)
            .autoOrient()
            .write(dest, function (err) {
                if (err) {
                    reject(err);
                }
                let buffer = fs.createReadStream(dest);
                let resizeImage = file;
                resizeImage.filename = resizeName;
                // resizeImage.path = dest;
                // resizeImage;
                return __uploadToS3(resizeImage, buffer)
                    .then(function (data) {
                        __deleteTempFile(dest);
                        resolve(data);
                    })
                    .catch(function (err) {
                        throw err
                    })
            });
    });
}

//========================== Export Module Start ==============================

module.exports = {uploadFile, uploadImageThumb};

//========================== Export Module End ===============================

