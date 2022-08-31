"use strict";

//========================== Load Modules Start =======================
const appUtils      = require("../../../appUtils");
//========================== Load internal modules ====================
const userDao = require('./userDao');

//========================== Load Modules End ==============================================

function login(params) {
    let query = {};
    query.email = params.email;
    query.password = appUtils.createHashSHA256(params.password);
    return userDao.getByKey(query)
    .then(function (result) {
        if (result) {
            return result;
        }else{
            return false;
        }
    })
}

function createAdmin(params) {
    return userDao.getByKey({email:params.email})
    .then(function (result) {
        if (!result) {
            return userDao.createUser(params);
        }else {
            return result;
        }
    })
}


function createUser(params) {
    return userDao.createUser(params)
}

function isEmailExist(params) {
    return userDao.isEmailExist(params)
}

function updateUser(params) {
    let update={};
    let query={_id:params.user.userId};
    if(params.name){
        update.name=params.name;
    }
    if(params.email){
        update.email=params.email;
    }
    if(params.password){
        update.password=params.password;
    }
    if(params.employeeId){
        update.employeeId=params.employeeId;
    }
    if(params.userType){
        update.userType=params.userType;
    }
    if(params.gender){
        update.gender=params.gender;
    }
    if(params.dob){
        update.dob=params.dob;
    }
    if(params.designation){
        update.designation=params.designation;
    }
    if(params.companyName){
        update.companyName=params.companyName;
    }
    if(params.profileImage){
        update.profileImage=params.profileImage;
    }
    if(params.workEmail){
        update.workEmail=params.workEmail;
    }
    if(params.skype){
        update.skype=params.skype;
    }
    if(params.website){
        update.website=params.website;
    }
    if(params.googleMap){
        update.googleMap=params.googleMap;
    }
    update.phoneNo=params.phoneNo;
    update.aboutUs=params.aboutUs;
    update.instagram=params.instagram;
    update.facebook=params.facebook;
    update.linkedin=params.linkedin;
    update.twitter=params.twitter;
    update.whatsApp=params.whatsApp;
    update.hangouts=params.hangouts;
    update.youtube=params.youtube;
    update.snapchat=params.snapchat;
    update.tiktok=params.tiktok;
    update.pinterest=params.pinterest;
    update.github=params.github;
    update.npm=params.npm;
    update.stackoverflow=params.stackoverflow;
    
    return userDao.updateUser(query,update)
}

function update(query,update) {
    return userDao.update(query,update)
}

function userList(params) {
    return userDao.userList(params)
}

function getByKey (param) {
    return userDao.getByKey(param)
}

function emailCheck(params) {
    return userDao.emailCheck(params)
}

function count(params) {
    return userDao.count(params)
}
//========================== Export Module Start ==============================

module.exports = {
    createAdmin,
    login,
    createUser,
    isEmailExist,
    updateUser,
    userList,
    getByKey,
    update,
    emailCheck,
    count
};

//========================== Export Module End ===============================
