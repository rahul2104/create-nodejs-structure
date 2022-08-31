"use strict";

const promise = require("bluebird");
const _ = require("lodash");

const userLogDao = require('./userLogDao');
//========================== Load Modules End ==============================================
function create(param) {
    return userLogDao.create(param)
}

function getByKey(param) {
    return userLogDao.getByKey(param)
}

function update(query,update) {
    return userLogDao.update(query,update)
}

function getList(param) {
    return userLogDao.getList(param)
}

//========================== Export Module Start ==============================
module.exports = {
    create,
    getByKey,
    update,
    getList
}
//========================== Export Module End ===============================
