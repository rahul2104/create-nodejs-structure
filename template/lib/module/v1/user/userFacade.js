"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
// Load user service
var _ = require("lodash");
var Promise = require("bluebird");
//========================== Load internal modules ====================

const usrService    = require('./userService');
const userMapper    = require('./userMapper');


const appUtils      = require('../../../appUtils');
const redisClient   = require("../../../redisClient/init");
const exceptions    = require("../../../customException");


//========================== Load Modules End ==============================================

function signUp(loginInfo) {
    return usrService.getUserByDeviceId(loginInfo)
        .bind({})
        .then(function (user) {
            this.user = user
            if (this.user) {
                return usrService.updateUser(loginInfo)
            } else {
                return usrService.signUp(loginInfo)
            }
        })
        .then(function (user) {
            return userMapper.loginMapping({ user: user, jwt: "12345", hitTime:[], chanellist: [], currentVersion: loginInfo.currentVersion, deviceTypeID: loginInfo.deviceTypeID, appType: loginInfo.appType});
        })
   
}

function socialLogin(loginInfo){
    return usrService.isSocialIdExist(loginInfo)
        .bind({})
        .then(function (user) {
            this.user = user;
            if (user) {
                return usrService.socialLogin(user,loginInfo)
            } else {
                return usrService.socialSignUp(loginInfo)
            }
        })
        .then(function (response) {
            if (response) {
                this.user = response;
                var tokenObj = buildUserTokenGenObj(response);
                return jwtHandler.generateUserToken(tokenObj)
            } else {
                throw exceptions.incorrectPass();
            }
        })
        .then(function (response) {
            
            this.jwt = response;
            let redisObj = appUtils.createRedisValueObject({ user: this.user });
            redisClient.setValue(response, JSON.stringify(redisObj));
            if (this.user) {
                return userMapper.loginMapping({
                    user: this.user,
                    jwt: this.jwt
                });
            }
            
        })
}

function guestLogin(loginInfo) {
    return usrService.getUserByDeviceId(loginInfo)
        .bind({})
        .then(function (user) {
            this.user = user
            if (this.user) {
                let query = {};
                    query.deviceID = loginInfo.deviceID;
                    var update = {};
                    if (loginInfo.deviceToken){
                        update.deviceToken = loginInfo.deviceToken;
                    }
                    if (loginInfo.name){
                        update.name = loginInfo.name;
                    }
                    if (loginInfo.username){
                        update.username = loginInfo.username;
                    }
                    if (loginInfo.profileImage){
                        update.profileImage = loginInfo.profileImage;
                    }
                    update.deviceTypeID = loginInfo.deviceTypeID;
                return usrService.updateUser(query,update)
                .then(function (response) {
                        if (response) {
                            return response;
                        } else {
                            throw exceptions.intrnlSrvrErr();
                        }
                    })
            } else {
                return usrService.signUp(loginInfo)
                .then(function (response) {
                        if (response) {
                            return response;
                        } else {
                            throw exceptions.intrnlSrvrErr();
                        }
                    })
            }
        })
        .then(function (response) {
            if (response) {
                this.user = response;
                var tokenObj = buildUserTokenGenObj(response);
                return jwtHandler.generateUserToken(tokenObj)
            } else {
                throw exceptions.incorrectPass();
            }
        })
        .then(function (response) {
            if (this.user) {
                this.jwt = response;
                let redisObj = appUtils.createRedisValueObject({ user: this.user });
                redisClient.setValue(response, JSON.stringify(redisObj));
                if (this.user) {
                    return userMapper.loginMapping({
                        user: this.user,
                        jwt: this.jwt,
                        currentVersion: loginInfo.currentVersion,
                    });
                }
            }
        })
   
}


/**
 * @function login
 * login via email
 * @param {Object} loginInfo login details
 */
function login(loginInfo) {
    
}


function buildUserTokenGenObj(user) {
    var userObj = {};
    userObj.deviceToken = user.deviceToken;
    userObj.deviceTypeID = user.deviceTypeID;
    userObj.deviceID = user.deviceID;
    userObj.userId = user._id;
    return userObj;
}



//========================== Export Module Start ==============================

module.exports = {
    signUp,
    guestLogin,
    socialLogin
};

//========================== Export Module End ===============================signUp