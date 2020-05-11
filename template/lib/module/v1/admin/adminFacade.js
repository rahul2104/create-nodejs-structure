"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
var Promise = require("bluebird");


//========================== Load internal modules ====================
// Load post service
const redisClient           = require("../../../redisClient/init");
const appUtils              = require("../../../appUtils");
const config                = require("../../../config");
const customExceptions      = require("../../../customException");

const adminService  = require("./adminService");
const adminMapper   = require("./adminMapper");


//========================== Load Modules End ==============================================

function login(params) {
    return adminService.isEmailExist(params)
        .bind({})
        .then(function (isExist) {
            this.isExist = isExist;

            if (isExist) {
                return adminService.login(params);
            } else {
                throw customExceptions.userNotFound();
            }
        })
        .then(function (response) {
            if (this.isExist) {
                if (response) {
                    if(response.status==1) {
                        this.user = response;
                        user.isAdmin=1;
                        var tokenObj = buildUserTokenGenObj(response);
                        return jwtHandler.genAdminToken(tokenObj)
                    } else {
                        throw customExceptions.inactiveAccount();
                    }
                } else {
                    throw customExceptions.incorrectPass();
                }
            }
        })
        .then(function (response) {
            if (this.isExist) {
                this.jwt = response;
                let redisObj = appUtils.createRedisValueObject({ user: this.user });
                redisClient.setValue(response, JSON.stringify(redisObj));

                return adminMapper.loginMapping({
                    user: this.user,
                    jwt: this.jwt
                });
            }
        })

}
function forgetPassword(adminInfo) {
    return adminService.isEmailExist(adminInfo)
        .then(function (result) {
            if (result == true) {
                return adminService.sendOtp(adminInfo)
                        .bind({})
                        .then(function(adminInfo){
                            return adminMapper.verifyEmailForAdmin(adminInfo)
                        })
                        .then(function (respObj) {
                            return respObj;
                        })
                        .catch(function (err) {
                            throw err
                        })
            }
            else {
                return { message: adminConstants.MESSAGES.invalidAdmin };
            }
        })
}

function getUsers(params) {
    return adminService.getUsers(params)
}

function blockUser(params) {
    return adminService.blockUser(params)
}

function buildUserTokenGenObj(user) {
    var userObj = {};
    userObj.deviceToken = (user.deviceToken)?user.deviceToken:'';
    userObj.deviceTypeID = (user.deviceTypeID)?user.deviceTypeID:'';
    userObj.deviceID = (user.deviceID)?user.deviceID:'';
    userObj.userId = user._id;
    return userObj;
}


//========================== Export Module Start ==============================

module.exports = {
    getUsers,
    blockUser,
    forgetPassword
};

//========================== Export Module End ===============================
