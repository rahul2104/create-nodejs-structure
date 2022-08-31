//========================== Load Modules Start ===========================

//========================== Load Internal Module =========================

// Load exceptions
var Exception = require("./model/Exception");
var constants = require("./constant");

//========================== Load Modules End =============================

//========================== Export Module Start ===========================

module.exports = {
    intrnlSrvrErr: function (err) {
        return new Exception(1, constants.MESSAGES.INTERNAL_SERVER_ERROR, err);
    },
    unauthorizeAccess: function (err) {
        return new Exception(2, constants.MESSAGES.UNAUTHORIZED_ACCESS, err)
    },
    alreadyRegistered: function (err) {
        return new Exception(3, constants.MESSAGES.EMAIL_ALREADY_EXIST, err)
    },
    invalidEmail: function () {
        return new Exception(4, constants.MESSAGES.INVALID_EMAIL)
    },
    getCustomErrorException: function (errMsg, error) {
        return new Exception(5, errMsg, error);
    },
    userNotFound: function () {
        return new Exception(6, constants.MESSAGES.USER_NOT_REGISTERED)
    },
    incorrectPass: function () {
        return new Exception(7, constants.MESSAGES.INCORRECT_PASS)
    },
};

//========================== Export Module   End ===========================
