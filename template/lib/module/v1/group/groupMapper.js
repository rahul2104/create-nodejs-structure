/**
 * This file will have request and response object mappings.
 */
var _ = require("lodash");
var constants = require('../../../constant');
const config = require('../../../config');



function joinGroup(params) {
    var respObj = {
        "message": "Result available.",

        "result": {
            group :params
        }
    }
    return respObj;
}


module.exports = {
    joinGroup
}