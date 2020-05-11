var constant = require('./constant'),
    customException = require('./customException'),
    logger = require('./logger').logger,
    APIResponse = require('./model/APIResponse');
    
var sendgrid_email = require('./service/sendgrid_email');
var config = require('./config/index');        

function _sendResponse(response, result) {
    // send status code 200
    return response.send(result);
}

function sendError(response, error,request) {
    // if error doesn't has sc than it is an unhandled error,
    // log error, and throw intrnl server error
    if (!error.errorCode) {
        logger.error(error, "Unhandled error.");
        error = customException.intrnlSrvrErr(error);
    }
    var result = new APIResponse(constant.STATUS_CODE.ERROR, error,request);
    _sendResponse(response, result);
}

function handleError(error, request, response, next) {
    // unhandled error
    sendError(response, error,request);
}

function sendSuccess(response, result,request) {
    var result = new APIResponse(constant.STATUS_CODE.SUCCESS, result,request);
    _sendResponse(response, result);
}

function sendErrorEmail(params) {
    //console.log("sendErrorEmail")
    let { env, response, error,request,headers,url } = params;
    let payload={
        email:config.cfg.smtp.errorLogEmail,
        subject:"Demo : Server Error",
        template:"errorLog.ejs",
        env, response, error,request,headers,url
    }
    sendgrid_email.sendEmail(payload);
}

// ========================== Export Module Start ==========================
module.exports = {
    sendError,
    handleError,
    sendSuccess,
    sendErrorEmail
}
// ========================== Export Module End ============================