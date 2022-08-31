"use strict";
//========================== Load Modules Start ===========================
var Promise = require("bluebird");
var mongoose = require("mongoose");
//========================== Load internal Module =========================

const redisSession = require("../redisClient/session");
const customException = require("../customException");
const constant = require("../constant");

const userService = require("../module/v1/user/userService");
//========================== Load Modules End =============================



var userRole=(role) => function (req, res, next) {
    console.log("role",role,req.user);
    let user=req.user;
    if(role){
        if(role<=user.userType){
            next();
        }else{
            throw customException.unauthorizeAccess();
        }
    }else{
        next();
    }
}


//========================== Export Module Start ===========================

module.exports = {
    userRole,
};

//========================== Export Module End ===========================
