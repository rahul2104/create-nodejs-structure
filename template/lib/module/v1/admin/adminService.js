"use strict";

const promise = require("bluebird");
const _ = require("lodash");


const adminDao = require('./adminDao');
const appUtils      = require("../../../appUtils");

//========================== Load Modules End ==============================================

function createAdmin(adminInfo) {
    return adminDao.findByKey({email:adminInfo.email})
        .then(function (result) {
            if (!result) {
                return adminDao.createAdmin(adminInfo);
            }else {
                return result;
            }
        })
}

function login(loginInfo) {
    let query = {};
    query.email = loginInfo.email;
    query.password = appUtils.createHashSHA256(loginInfo.password);
     return adminDao.findByKey(query)
        .then(function (result) {
            if (result) {
                return result;
            }else{
                return false;
            }
        })
}

function isEmailExist(adminInfo) {
    return adminDao.findByKey({email:adminInfo.email})
        .then(function (result) {
            if (result) {
                return result;
            }else {
                return false;
            }
        })
}

function isAdmin(params) {
    let query = {};
    query._id = params.user.userId;
    return adminDao.findByKey(query)
        .then(function (result) {
            if (result) {
                return true;
            }else {
                return false;
            }
        })
}


//========================== Export Module Start ==============================

module.exports = {
    login,
    createAdmin,
    isEmailExist,
    isAdmin,
};

//========================== Export Module End ===============================
