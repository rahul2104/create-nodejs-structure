var _ = require("lodash");

var appUtils = require("../../../appUtils");
var constant = require("../../../constant");

var exceptions = require("../../../customException");

//========================== Load Modules End =============================

//========================== Export Module Start ===========================

var validateAdminLogin = function (req, res, next) {
    let {email, password} = req.body;
    var errors = [];
    email = _.toLower(email);
    
    if (_.isEmpty(email)) {
        errors.push({fieldName: "email", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "email") });
    }
    if (!appUtils.isValidEmail(email)) {
        errors.push({fieldName: "email", message: constant.MESSAGES.INVALID_EMAIL});
    }
    if (_.isEmpty(password)) {
        errors.push({fieldName: "password", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "email") });
    }
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};

var validateEmail = function(req,res,next){
    let {email} = req.body;
    var errors = [];

    email = _.toLower(email);
    if (_.isEmpty(email)) {
        errors.push({fieldName: "email", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "email") });
    }
    if (!appUtils.isValidEmail(email)) {
        errors.push({fieldName: "email", message: constant.MESSAGES.INVALID_EMAIL});
    }
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
}

var validateBlockUser = function (req, res, next) {

    var { userId } = req.body;
    var errors = [];
    if (_.isEmpty(userId)) {
        errors.push({ fieldName: "userId", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "userId") });
    }
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};

var validateGetUserPageList = function (req, res, next) {

    var {pageNo, count} = req.params;
    var errors = [];

    if (pageNo) {
        pageNo = req.body.pageNo = parseInt(pageNo);
    }

    if (count) {
        count = req.body.count = parseInt(count);
    }

    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};

var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(constant.MESSAGES.VALIDATION_ERROR, errors))
    }
    next();
}

module.exports = {
    validateAdminLogin,
    validateGetUserPageList,
    validateBlockUser,
    validateEmail
  };
//========================== Export module end ==================================
