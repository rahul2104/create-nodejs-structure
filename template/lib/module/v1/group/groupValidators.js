//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");

//========================== Load Internal Module =========================
var exceptions = require("../../customException");
var constant = require("../../constant");

//========================== Load Modules End =============================



//========================== Export Module Start ===========================

var joinGroup = function (req, res, next) {

    var { matchId } = req.body;

    var {  } = req.headers;
    var errors = [];
    if (_.isEmpty(matchId)) {
        errors.push({ fieldName: "matchId", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "matchId") });
    }

    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
}


var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(constant.MESSAGES.VALIDATION_ERROR, errors))
    }
    next();
}

module.exports = {
    joinGroup,
};
//========================== Export module end ==================================
