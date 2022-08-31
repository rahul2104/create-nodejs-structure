/**
 * This file will have request and response object mappings.
 */
var _ = require("lodash");
const contstants = require("../../../constant");
const config = require('../../../config');

function loginMapping(params) {
    let userInfo=params.user;
    delete userInfo.password;        
    var respObj = {
        "message": "Successfully Login",
        "accessToken": params.accessToken,
        "mediaPath":config.cfg.s3.mediaPath,
        "result": userInfo,
    }
    return respObj;
}

function createMapping(params){
    let userInfo=params.user;
    if(userInfo.password){
        delete userInfo.password;    
    }   
    if(userInfo.deviceToken){
        delete userInfo.deviceToken;    
    }
    if(userInfo.deviceID){
        delete userInfo.deviceID;    
    }
    if(userInfo.deviceTypeId){
        delete userInfo.deviceTypeId;    
    }
    if(userInfo.status){
        delete userInfo.status;    
    }
    if(userInfo.updated){
        delete userInfo.updated;    
    }
    var respObj = {
        "message": "User Created Successfully",
        "mediaPath":config.cfg.s3.mediaPath,
        "result": userInfo,
    }
    return respObj;
}

function editMapping(params){
    let userInfo=params.user;
    if(userInfo.password){
        delete userInfo.password;    
    }
    if(userInfo.deviceToken){
        delete userInfo.deviceToken;    
    }
    if(userInfo.deviceID){
        delete userInfo.deviceID;    
    }
    if(userInfo.deviceTypeId){
        delete userInfo.deviceTypeId;    
    }
    if(userInfo.status){
        delete userInfo.status;    
    }
    if(userInfo.updated){
        delete userInfo.updated;    
    }
        
    var respObj = {
        "message": "User Updated Successfully",
        "mediaPath":config.cfg.s3.mediaPath,
        "result": userInfo,
    }
    return respObj;
}

function detailsMapping(params){
    let userInfo=params.user;
    if(userInfo.password){
        delete userInfo.password;    
    }
    if(userInfo.deviceToken){
        delete userInfo.deviceToken;    
    }
    if(userInfo.deviceID){
        delete userInfo.deviceID;    
    }
    if(userInfo.deviceTypeId){
        delete userInfo.deviceTypeId;    
    }
    if(userInfo.status){
        delete userInfo.status;    
    }
    if(userInfo.updated){
        delete userInfo.updated;    
    }
        
    var respObj = {
        "message": "User Details",
        "mediaPath":config.cfg.s3.mediaPath,
        "result": userInfo,
    }
    return respObj;
}

function forgetMapper(){
    var respObj = {
        "message": "Email has been send successfully",
    }
    return respObj;
}

function resetMapper(){
    var respObj = {
        "message": "Password has been reset successfully",
    }
    return respObj;
}

function contactFileMapper(params){
    let userInfo=params.user;
    if(userInfo.password){
        delete userInfo.password;    
    }
    if(userInfo.deviceToken){
        delete userInfo.deviceToken;    
    }
    if(userInfo.deviceID){
        delete userInfo.deviceID;    
    }
    if(userInfo.deviceTypeId){
        delete userInfo.deviceTypeId;    
    }
    if(userInfo.status){
        delete userInfo.status;    
    }
    if(userInfo.updated){
        delete userInfo.updated;    
    }
        
    var respObj = {
        "message": "User Details",
        filePath:params.filePath,
        "mediaPath":config.cfg.s3.mediaPath,
        "result": userInfo,
    }
    return respObj;
}

function changePasswordMapper(){
    var respObj = {
        "message": "Password has been changed successfully",
    }
    return respObj;
}

function userListMapper(params){
    var respObj = {
        "message": "User list",
        "mediaPath":config.cfg.s3.mediaPath,
        "totalCount": params.totalCount,
        "result": params.result,
    }
    return respObj;
}

function statusChangeMapper(params){
    let message;
    if(params.status==1){
        message="User has been activated successfully"
    }else{
        message="User has been inactivated successfully"
    }
    var respObj = {
        "message": message,
    }
    return respObj;
}

module.exports = {
    loginMapping,
    createMapping,
    editMapping,
    detailsMapping,
    forgetMapper,
    resetMapper,
    contactFileMapper,
    changePasswordMapper,
    userListMapper,
    statusChangeMapper
}