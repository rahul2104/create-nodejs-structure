"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const groupModel = require('./groupModel');


// init user dao
let BaseDao = require('../../../dao/baseDao');
const groupDao = new BaseDao(groupModel);


//========================== Load Modules End ==============================================

function create(params) {
    let match = new groupModel(params);
    return groupDao.save(match);
}

function update(query,update) {
        update.updated = new Date();   
    let option = {};
        option.new = true;
        option.upsert=true;
    return groupDao.findOneAndUpdate(query, update, option);
}


function getByKey(query) {
    return groupDao.findOne(query)
}

//========================== Export Module Start ==============================

module.exports = {
    create,
    update,
    getByKey
};

//========================== Export Module End ===============================
