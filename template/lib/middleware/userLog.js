"use strict";
//========================== Load Modules Start ===========================

//========================== Load internal Module =========================
var config = require('../config');

var userLogService = require('../module/v1/userLog/userLogService');
//========================== Load Modules End =============================

var createLog = function (request, response, next) {
    const { rawHeaders, httpVersion, method, socket, url,headers } = request;
    const { remoteAddress, remoteFamily } = socket;
//    console.log("log",JSON.stringify({
//      created: Date.now(),
//      rawHeaders,
//      httpVersion,
//      method,
//      remoteAddress,
//      remoteFamily,
//      url
//    }));
    //console.log("rawHeaders",typeof rawHeaders,headers)
    userLogService.create({
      created: Date.now(),
      rawHeaders:JSON.stringify(rawHeaders),
      httpVersion,
      headers,
      method,
      remoteAddress:request.ip,
      remoteFamily,
      url});
    next();
}

module.exports = {
    createLog
}