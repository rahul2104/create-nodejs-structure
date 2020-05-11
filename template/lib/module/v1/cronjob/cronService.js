"use strict";

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
const promise = require("bluebird");
// Load user dao
var _ = require("lodash");
const cronDao = require('./cronDao');

//========================== Load Modules End ==============================================


function create(param) {
    return cronDao.create(param)
}

function update(query,update) {
    return cronDao.update(query,update)
}

//========================== Export Module Start ==============================

module.exports = {
    create,
    update
};

//========================== Export Module End ===============================
