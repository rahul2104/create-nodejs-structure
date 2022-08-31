"use strict";
//========================== Load Modules Start ===========================
const smartcrop = require('smartcrop');
//========================== Load internal Module =========================
var config = require('../config');

//========================== Load Modules End =============================

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

function userProfileCreate(){
	return function(request, response, next){
    var files = _fetchFilesFromReq(request);
    if(!files){
        return next();
    }
    let image=files[0];
    smartcrop.crop(image, { width: 100, height: 100 })
    .then(function(result) {
        console.log("smartcrop",result);
    });
}
}

module.exports = {
    userProfileCreate
}
