const Router        = require("express").Router();
const resHndlr      = require("../../responseHandler");
const middleware    = require("../../middleware");
const constants     = require("../../constant");
const jwtHandler    = require("../../jwtHandler");

const cronFacade = require("./cronFacade");

Router.route("/test")
    .get([], function (req, res) {
        cronFacade.test({
        }).then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        }).catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    });
    

module.exports = Router;
