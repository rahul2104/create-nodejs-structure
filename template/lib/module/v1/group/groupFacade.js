"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
var Promise = require("bluebird");
//========================== Load internal modules ====================
// Load user service
var _ = require("lodash");

const groupService  = require('./groupService');
const groupMapper   = require('./groupMapper');

const appUtils       = require('../../appUtils');

const exceptions     = require("../../customException");


//========================== Load Modules End ==============================================


function joinGroup(param) {
    return groupService.joinGroup(param)
        .then(function (match) {
            return match;
        })
        .then(function (group) {
            return groupMapper.joinGroup(group);
        })
        .catch(function (err) {
            throw err;
        })           
}




//========================== Export Module Start ==============================

module.exports = {
    joinGroup,
};

//========================== Export Module End ===============================signUp