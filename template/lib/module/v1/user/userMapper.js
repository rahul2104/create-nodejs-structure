/**
 * This file will have request and response object mappings.
 */
var _ = require("lodash");
const contstants = require("../../../constant");
const config = require('../../../config');

function loginMapping(params) {
    var respObj = {
        "message": "Successfully Login",
        "accessToken": params.jwt,
        "userProfile": {
            "_id": params.user._id,
            "email": params.user.email,
            "name": params.user.name,
            "username": params.user.username,
            "gender": params.user.gender,
            "dob": params.user.dob,
            "profileImage": (params.user.profileImage!='')?((params.user.isSocialImage==1)?params.user.profileImage:config.cfg.s3.base_url+params.user.profileImage):'',
            "deviceToken" : params.user.deviceToken,
            "totalPred": params.user.totalPred,
            "wonPred" : params.user.wonPred,
            "lostPred" : params.user.lostPred,
            "isGuest" : params.user.isGuest,
        },
    }
    return respObj;
}


module.exports = {
    loginMapping,
}