"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const cronModel = require('./cronModel');

let BaseDao = require('../../../dao/baseDao');
const cronDao = new BaseDao(cronModel);

function create(params) {
    let cron = new cronModel(params);
    return cronDao.save(cron);  
}

function update(query,update) {
        update.updated = new Date();   
    let option = {};
        option.new = true;
        option.upsert=true;
    return cronDao.findOneAndUpdate(query, update, option);
}

//========================== Export Module Start ==============================

module.exports = {
    create,
    update,
};

//========================== Export Module End ===============================
