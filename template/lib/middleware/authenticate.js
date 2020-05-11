"use strict";
//========================== Load Modules Start ===========================
var Promise = require("bluebird");
var mongoose = require("mongoose");
//========================== Load internal Module =========================

const redisSession = require("../redisClient/session");
const customException = require("../customException");

const adminService = require("../module/v1/admin/adminService");
const userService = require("../module/v1/user/userService");
//========================== Load Modules End =============================

var __verifyTok = function (acsTokn) {
    return redisSession.getByToken(acsTokn)
        .then(function (tokenPayload) {
            return tokenPayload;
        })
        .catch(function (err) {
            throw err
        })
};

var expireToken = function (req, res, next) {
    let acsToken = req.get('accessToken');
    return redisSession.expire(acsToken)
        .then(function (result) {
            //return result;
            next();
        })
        .catch(function (err) {
            next(err)
        })
}

var autntctTkn = function (req, res, next) {
    let acsToken = req.get('accessToken');

    __verifyTok(acsToken)
        .bind({})
        .then(function (tokenPayload) {
            //console.log('tokenPayload: ', tokenPayload);
            if (tokenPayload.d) {
                let userId=mongoose.Types.ObjectId(tokenPayload.d.userId)
                req.user = tokenPayload.d;
                req.user.userId=userId;
                next()
            } else {
               throw customException.sessionExpired();
                //res.render('reset_failure', {error_message: "Your token has been expired. Please try forgot password again."});
            }
        })
        .catch(function (err) {
            next(err)
        })
}

var authSocketTkn = function (socket, next) {

    var accessToken = socket.handshake.query.accessToken;
    next();
    __verifyTok(accessToken)
        .bind({})
        .then(function (tokenPayload) {
            if (tokenPayload.d) {
                let paylod = tokenPayload.d;
                socket.payload = tokenPayload.d;
                if (paylod.isAdmin == 0) {
                    return userService.getByKey({ _id: paylod.userId });
                } else {
                    return adminService.findByKey({ _id: paylod.userId });
                }
            } else {
                next()
               //throw customException.sessionExpired();
            }
        })
        .then(function (user) {
            socket.user = user;
            next()
        })
        .catch(function (err) {
            next(new Error('Authentication error'));
        })
}


//========================== Export Module Start ===========================

module.exports = {
    autntctTkn,
    expireToken,
    authSocketTkn
};

//========================== Export Module End ===========================
