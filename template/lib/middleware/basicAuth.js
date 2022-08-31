"use strict";
//========================== Load Modules Start ===========================
var auth = require('basic-auth');
//========================== Load internal Module =========================
var config = require('../config');
//========================== Load Modules End =============================

var basicAuthentication = function (request, response, next) {
//    console.log('basicAuthentication');
    if (request.method == 'OPTIONS') {
        response.sendStatus(200);
    } else{
        var credentials = auth(request);
        if (!credentials || credentials.name !== config.cfg.basicAuth.name || credentials.pass !== config.cfg.basicAuth.pass) {
          response.statusCode = 401
          //response.setHeader('WWW-Authenticate', 'Basic realm="example"')
          response.send({message:'Access denied'})
        } else {
            next();
        }
    }
}

module.exports = {
    basicAuthentication
}