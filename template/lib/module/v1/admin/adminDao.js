"use strict";

//========================== Load Modules Start =======================

var mongoose = require("mongoose");
let BaseDao = require('../../../dao/baseDao');

const Admin = require('./adminModel');

const adminDao = new BaseDao(Admin);

//========================== Load Modules End ==============================================

function createAdmin(createAdminReq) {
    var admin = new Admin(createAdminReq);
    return adminDao.save(admin);
}

function findByKey(query) {
    return adminDao.findOne(query);
}

function getUsers(params) {
    let query = {};
   // query.isActive = 1;
   let pageNo=params.pageNo;
   let count=parseInt(params.count);
     return adminDao.find(query).lean().sort({ name: 1 }).skip(pageNo * count).limit(count);
  
}

function blockUser(params) {
    let query = {};
    query._id = params.userId;
    let update = {};
     update["$set"] = {"isBlock.status": 2 };
    update.updated = Date.now();
    let option = {};
    option.new = true;
    return adminDao.findOneAndUpdate(query, update, option);
}

//========================== Export Module Start ==============================

module.exports = {
    createAdmin,
    findByKey,
    getUsers,
    blockUser,
};

//========================== Export Module End ===============================
