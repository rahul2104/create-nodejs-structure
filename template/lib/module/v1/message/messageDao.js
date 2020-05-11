"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const messageModel = require('./messageModel');


// init user dao
let BaseDao = require('../../../dao/baseDao');
const messageDao = new BaseDao(messageModel);


//========================== Load Modules End ==============================================

function create(params) {
    let match = new messageModel(params);
    return messageDao.save(match);
}

function update(query,update) {
        update.updated = new Date();   
    let option = {};
        option.new = true;
    return messageDao.update(query, update, option);
}


function getByKey(query) {
    return messageDao.findOne(query)
}

//========================== Export Module Start ==============================

module.exports = {
    create,
    update,
    getByKey
};

//========================== Export Module End ===============================
