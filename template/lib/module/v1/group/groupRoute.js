const Router        = require("express").Router();
const resHndlr      = require("../../responseHandler");
const middleware    = require("../../middleware");
const constants     = require("../../constant");
const jwtHandler    = require("../../jwtHandler");
const groupFacade  = require("./groupFacade");
const validators    = require("./groupValidators");

Router.route("/join")
    .post([validators.joinGroup,middleware.authenticate.autntctTkn], function (req, res) {
        let { matchId } = req.body;
        let { user } = req;
        groupFacade.joinGroup({
            user,matchId
        }).then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        }).catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    });

         
module.exports = Router;
