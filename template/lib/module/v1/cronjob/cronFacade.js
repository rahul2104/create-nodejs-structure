"use strict";
//========================== Load Modules Start =======================

//========================== Load external modules ====================
var Promise     = require("bluebird");
var request     = require('request');
var asynchLoop  = require("node-async-loop");
var Client      = require('node-rest-client').Client;

//========================== Load internal modules ====================
// Load user service
var _       = require("lodash");
var moment  = require('moment');
//const newsService   = require('../news/newsService');
//const seriesService   = require('../series/seriesService');

const appUtils      = require('../../appUtils');
const config        = require("../../config");
const exceptions    = require("../../customException");

const cronService    = require("./cronService");

var client = new Client();

//========================== Load Modules End ==============================================

var previousDateMonth   = moment().add(-1, 'months').format('YYYY-MM');
var currentDateMonth    = moment().format('YYYY-MM');
var nextDateMonth       = moment().add(1, 'months').format('YYYY-MM');
var nextplusDateMonth   = moment().add(2, 'months').format('YYYY-MM');

var yearMonth = [];
var yearMonthUpcomming = [];
yearMonth.push(previousDateMonth);
yearMonth.push(currentDateMonth);
//yearMonth.push(nextDateMonth);
//yearMonth.push(nextplusDateMonth);

//console.log('yearMonth',yearMonth);
yearMonthUpcomming.push(currentDateMonth);
yearMonthUpcomming.push(nextDateMonth);

//=======================================================================
function test(param){
    var cronParam={
        userId:'test1234',
        jobType:1,
        sleepUntil: moment(),
        interval: '* * * * * *',  //(sec, min, hour, day of month, month ,day of week )
        repeatUntil: moment().add(5,"minutes"),
    }
    return cronService.create(cronParam);
}


//========================== Export Module Start ==============================

module.exports = {
    test,
};

//========================== Export Module End ===============================signUp