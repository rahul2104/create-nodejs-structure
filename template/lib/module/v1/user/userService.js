"use strict";

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
const promise = require("bluebird");
// Load user dao
var _ = require("lodash");
const userDao = require('./userDao');

//========================== Load Modules End ==============================================

function isSocialIdExist(params){
    return userDao.isSocialIdExist(params);
}

function socialLogin(user,loginInfo){
    let query = {};
        query._id = user._id;
    
    var update = {};
    if (loginInfo.deviceToken){
        update.deviceToken = loginInfo.deviceToken;
    }
        update.deviceTypeID = loginInfo.deviceTypeID;     
        update.deviceID     = loginInfo.deviceID; 
        update.username     = loginInfo.username; 
        update.isGuest      =0;
        update.isSocialImage=1;
    if (loginInfo.email){
        update.email        = loginInfo.email; 
    }
    if (loginInfo.dob){
        update.dob          = loginInfo.dob; 
    } 
    if (loginInfo.name){
        update.name         = loginInfo.name; 
    }    
    if (loginInfo.gender){
        update.gender       = loginInfo.gender; 
    } 
    if (loginInfo.profileImage){
        update.profileImage = loginInfo.profileImage; 
    } 
    return userDao.updateUser(query,update)
}

function socialSignUp(loginInfo){
    let query = {};
    if(loginInfo.socialType==1){       //1= Facebook, 2=Google
        loginInfo.facebookId = loginInfo.socialId;
    }else{
        loginInfo.googleId = loginInfo.socialId;
    }
        delete loginInfo.socialId;
        delete loginInfo.socialType;
        
        loginInfo.isGuest      =0;
        loginInfo.isSocialImage=1;
    return userDao.signUp(loginInfo);
}

function login(loginInfo) {
    return userDao.login(loginInfo)
}

function getUserByDeviceId(loginInfo) {
    return userDao.getUserByDeviceId(loginInfo)
}

function signUp(loginInfo) {
    return userDao.signUp(loginInfo)
}
function givePoll(params) {
    return userDao.givePoll(params)
}
function pollPrediction(params) {
    return userDao.pollPrediction(params)
}
function isEmailIdExist(loginInfo) {
    return userDao.isEmailIdExist(loginInfo)
}

function updateUser(query,update) {
    return userDao.updateUser(query,update)
}
function changePassword(params) {
    return userDao.changePassword(params)
}
function updateProfileImage(params) {
    return userDao.updateProfileImage(params)
}
function getUserProfile(userId) {
    return userDao.getUserProfile(userId)
}
function verifyUser(params) {
    return userDao.verifyUser(params)
}

function userList(params) {
    return userDao.userList(params)
}

function getByKey (param) {
    return userDao.getByKey(param)
}


//========================== Export Module Start ==============================

module.exports = {
    isSocialIdExist,
    socialLogin,
    socialSignUp,
    login,
    signUp,
    getUserByDeviceId,
    isEmailIdExist,
    getUserProfile,
    updateUser,
    updateProfileImage,
    verifyUser,
    changePassword,
    userList,
    givePoll,
    pollPrediction,
    getByKey
};

//========================== Export Module End ===============================
