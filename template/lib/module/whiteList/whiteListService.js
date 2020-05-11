"use strict";

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
const promise = require("bluebird");
// Load user dao
var _ = require("lodash");
const whiteListDao = require('./whiteListDao');

//========================== Load Modules End ==============================================

function createIP(param) {
    return whiteListDao.createIP(param)
}

function create(param) {
    return whiteListDao.create(param)
}

function getByKey(param) {
    return whiteListDao.getByKey(param)
}

function update(query,update) {
    return whiteListDao.update(query,update)
}

function updateOne(query,update) {
    return whiteListDao.updateOne(query,update)
}

function getAllwhiteListIP(param) {
    return whiteListDao.getAllwhiteListIP(param)
}

//========================== Export Module Start ==============================

module.exports = {
    createIP,
    create,
    getByKey,
    update,
    updateOne,
    getAllwhiteListIP
};

//========================== Export Module End ===============================
