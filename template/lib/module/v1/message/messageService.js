"use strict";

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
const promise = require("bluebird");
// Load user dao
var _ = require("lodash");
const messageDao = require('./messageDao');

//========================== Load Modules End ==============================================


function create(param) {
    return messageDao.create(param)
}

function getByKey(param) {
    return messageDao.getByKey(param)
}

function update(query,update) {
    return messageDao.update(query,update)
}


//========================== Export Module Start ==============================

module.exports = {
    create,
    getByKey,
    update
};

//========================== Export Module End ===============================
