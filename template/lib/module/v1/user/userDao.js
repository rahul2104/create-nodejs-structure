"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const User = require('./userModel');


// init user dao
let BaseDao = require('../../../dao/baseDao');
const userDao = new BaseDao(User);


//========================== Load Modules End ==============================================

function signUp(userInfo) {

    userInfo.totalPred = 0;
    userInfo.wonPred = 0,
    userInfo.lostPred = 0;

    let user = new User(userInfo);
    return userDao.save(user);
}

function getUserByDeviceId(loginInfo) {
    let query = {};
    query.status = true;
    query.deviceID = loginInfo.deviceID
    return userDao.findOne(query)
}

function updateUser(query,update) {
        update.updated = new Date();   
    let option = {};
        option.new = true;
    return userDao.findOneAndUpdate(query, update, option);
}

function isEmailIdExist(params) {
    let query = {};
    query.email = params.email;
    return userDao.findOne(query)
        .then(function (result) {
            if (result) {
                return true;
            }
            else {
                return false;
            }
        })
}

function isSocialIdExist(params) {
    let query = {};
    if(params.socialType==1){       //1= Facebook, 2=Google
        query.facebookId = params.socialId;
    }else{
        query.googleId = params.socialId;
    }
    
    return userDao.findOne(query)
}

function getUserProfile(userId) {
    let query = {};
    // query.isActive = true;
    query._id = userId
    return userDao.findOne(query)
}

function getOtherUserProfile(params) {
    let query = {};
    // query.isActive = true;
    query._id = params.userId
    return userDao.find(query)
}


function userList(params) {
    let query = {};
    if (params.search) {
        query["$or"] = [{ "name": { $regex: params.search } }]
    }
    if (params.pageNo) {
        let pageNo = params.pageNo - 1;
        let count = parseInt(params.count);
        return User.find(query, '_id name profileImage').lean().sort({ name: 1 }).skip(pageNo * count).limit(count);

    }
    else {
        return User.find(query, '_id name profileImage').lean().sort({ name: 1 })

    }
}

function givePoll(params) {
    let query = {};
    query.appUserID = params.userId;
    let update = {};
    update["$inc"] = { 'totalPred': 1 };
    update.updated = Date.now();
    let option = {};
    option.new = true;
    return userDao.findOneAndUpdate(query, update, option);
}

function pollPrediction(params) {
    let query = {};
    query.appUserID = params.userId;
    let update = {};
    if (params.pollType == 1) {
        update["$wonPred"] = { 'totalPred': 1 };

    } else {
        update["$lostPred"] = { 'totalPred': -1 };

    }
    update.updated = Date.now();
    let option = {};
    option.new = true;
    return userDao.findOneAndUpdate(query, update, option);
}

function getByKey(query) {
    return userDao.findOne(query)
}

//========================== Export Module Start ==============================

module.exports = {
    signUp,
    getUserByDeviceId,
    updateUser,
    isSocialIdExist,
    getByKey,
    
    givePoll,
    pollPrediction,
    isEmailIdExist,
    getUserProfile,
    getOtherUserProfile,
    userList,

};

//========================== Export Module End ===============================
