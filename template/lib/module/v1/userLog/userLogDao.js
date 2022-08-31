"use strict";

//========================== Load Modules Start =======================

var mongoose = require("mongoose");
let BaseDao = require('../../../dao/baseDao');

const userLogModel = require('./userLogModel');
const userLogDao = new BaseDao(userLogModel);
//========================== Load Modules End ==============================================

function create(params) {
    var accessCode = new userLogModel(params);
    return userLogDao.save(accessCode);
}


function update(query,update) {
        update.updated = new Date();   
    let option = {};
        option.new = true;
        //option.upsert=true;
    return userLogDao.update(query, update, option);
}


function getByKey(query) {
    return userLogDao.findOne(query)
}


//========================== Export Module Start ==============================

module.exports = {
    create,
    update,
    getByKey
};

//========================== Export Module End ===============================
