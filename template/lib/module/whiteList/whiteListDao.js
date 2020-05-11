"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const whiteListModel = require('./whiteListModel');


// init user dao
let BaseDao = require('../../dao/baseDao');
const whiteListDao = new BaseDao(whiteListModel);


//========================== Load Modules End ==============================================

function createIP(params) {
    let query={IP:params.IP};
    let update=params;
    let option = {};
        option.new = true;
        option.upsert = true;
    return whiteListDao.updateOne(query, update, option);
}

function create(params) {
    let match = new messageModel(params);
    return whiteListDao.save(match);
}

function update(query,update) {
        update.updated = new Date();   
    let option = {};
        option.new = true;
    return whiteListDao.update(query, update, option);
}

function updateOne(query,update) {
        update.updated = new Date();   
    let option = {};
        option.new = true;
    return whiteListDao.updateOne(query, update, option);
}

function getByKey(query) {
    return whiteListDao.findOne(query)
}

function getAllwhiteListIP(param) {
    return whiteListDao.find()
}

//========================== Export Module Start ==============================

module.exports = {
    createIP,
    create,
    update,
    updateOne,
    getByKey,
    getAllwhiteListIP
};

//========================== Export Module End ===============================
