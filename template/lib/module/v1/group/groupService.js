"use strict";

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
const promise = require("bluebird");
// Load user dao
var _ = require("lodash");
const groupDao = require('./groupDao');

//========================== Load Modules End ==============================================


function create(param) {
    return groupDao.create(param)
}

function getByKey(param) {
    return groupDao.getByKey(param)
}

function update(query,update) {
    return groupDao.update(query,update)
}

function joinGroup(param){
    let query={matchId:param.matchId};
    let update={$set:{matchId:param.matchId},$addToSet:{userId:param.user._id}};
    return groupDao.update(query,update);
}

//========================== Export Module Start ==============================

module.exports = {
    create,
    getByKey,
    update,
    joinGroup
};

//========================== Export Module End ===============================
