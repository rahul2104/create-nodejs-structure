const router = require("express").Router();
const requestIp = require('request-ip');

const resHndlr = require("../../../responseHandler");
const middleware = require("../../../middleware");
const constants = require("../../../constant");
const userFacade = require("./userFacade");
const validators = require("./userValidators");

const constant = require("../../../constant");
//==============================================================

router.route("/create")
    .post([middleware.authenticate.autntctTkn,middleware.authenticateRole.userRole(constant.ACCOUNT_ROLE.ADMIN),middleware.multer.single('profileImage'),middleware.mediaUpload.uploadSingleMediaToS3('profile')], function (req, res) {
        let profileImage;       
        let profileImageData;
        let {name,
            employeeId,
            email,
            password,
            userType,
            gender,
            dob,
            designation,
            companyName,
            aboutUs,
            workEmail,
            phoneNo,
            whatsApp,
            skype,
            website,
            instagram,
            facebook,
            linkedin,
            twitter,
            googleMap,
            hangouts,
            youtube,
            snapchat,
            tiktok,
            github,
            npm,
            stackoverflow, 
            pinterest,s3ImageData } = req.body;
        let {user} = req;
        if (s3ImageData) {
            profileImageData = s3ImageData;
            profileImage = s3ImageData.key;
        }
        let clientIp = requestIp.getClientIp(req);
            //console.log("params",req.body);
        userFacade.create({
            employeeId,
            user,
            name,
            email,
            password,
            userType,
            gender,
            dob,
            designation,
            companyName,
            aboutUs,
            profileImage,
            workEmail,
            phoneNo,
            whatsApp,
            skype,
            website,
            instagram,
            facebook,
            linkedin,
            twitter,
            googleMap,
            hangouts,
            youtube,
            snapchat,
            tiktok,
            github,
            npm,
            stackoverflow, 
            pinterest,s3ImageData })
        .then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    });
    
router.route("/login")
    .post([validators.validateLogin], function (req, res) {
        let {email, password } = req.body;
        let clientIp = requestIp.getClientIp(req);
        userFacade.userLogin({ email, password,clientIp })
        .then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    });

router.route("/edit")
    .post([middleware.authenticate.autntctTkn,middleware.authenticateRole.userRole(constant.ACCOUNT_ROLE.ADMIN),middleware.multer.single('profileImage'),middleware.mediaUpload.uploadSingleMediaToS3('profile')], function (req, res) {
        let profileImage;       
        let profileImageData;
        let {name,
            email,
            password,
            employeeId,
            //userType,
            gender,
            dob,
            designation,
            companyName,
            aboutUs,
            workEmail,
            phoneNo,
            whatsApp,
            skype,
            website,
            instagram,
            facebook,
            linkedin,
            twitter,
            googleMap,
            hangouts,
            youtube,
            snapchat,
            tiktok,
            pinterest,
            userId,
            github,
            npm,
            stackoverflow, 
            s3ImageData
        } = req.body;
        let {user} = req;
        if (s3ImageData) {
            profileImageData = s3ImageData;
            profileImage = s3ImageData.key;
        }
        let clientIp = requestIp.getClientIp(req);
//            console.log("params",req.body);
        userFacade.edit({
            user,
            name,
            email,
            password,
            employeeId,
            //userType,
            gender,
            dob,
            designation,
            companyName,
            aboutUs,
            profileImage,
            workEmail,
            phoneNo,
            whatsApp,
            skype,
            website,
            instagram,
            facebook,
            linkedin,
            twitter,
            googleMap,
            hangouts,
            youtube,
            snapchat,
            tiktok,
            pinterest,
            userId,
            github,
            npm,
            stackoverflow, 
            s3ImageData
        })
        .then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    });
  
router.route("/details")
    .post([middleware.authenticate.autntctTkn], function (req, res) {
        let {userId} = req.body;
        let {user} = req;
        let clientIp = requestIp.getClientIp(req);
        if(!userId){
            userId=user.userId;
        }
        userFacade.details({ userId,clientIp })
        .then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    });
    
router.route("/forgot")
    .post([validators.validateForgot], function (req, res) {
        let {email} = req.body;
        let clientIp = requestIp.getClientIp(req);
        userFacade.forgetPassword({ email,clientIp })
        .then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    });    

router.route("/reset")
    .post([validators.validateReset,middleware.authenticate.autntctTkn], function (req, res) {
        let {password} = req.body;
        let {user} = req;
        let clientIp = requestIp.getClientIp(req);
        userFacade.resetPassword({ user,password,clientIp })
        .then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    }); 
    
router.route("/checkForgotToken")
    .post([middleware.authenticate.autntctTkn], function (req, res) {
        let {userId} = req.body;
        let clientIp = requestIp.getClientIp(req);
        userFacade.details({ userId,clientIp })
        .then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    }); 
    
router.route("/info")
    .post([validators.validateUserInfo], function (req, res) {
        let {employeeId} = req.body;
        let clientIp = requestIp.getClientIp(req);
        userFacade.userInfo({ employeeId,clientIp })
        .then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    });  
    
router.route("/contactFile")
    .post([validators.validateUserInfo], function (req, res) {
        let {employeeId} = req.body;
        let clientIp = requestIp.getClientIp(req);
        userFacade.contactFile({ employeeId,clientIp })
        .then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    }); 
    
router.route("/changePassword")
    .post([validators.validateChangePassword,middleware.authenticate.autntctTkn], function (req, res) {
        let {oldPassword,password} = req.body;
        let {user} = req;
        let clientIp = requestIp.getClientIp(req);
        userFacade.changePassword({ user,oldPassword,password,clientIp })
        .then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    });  
    
router.route("/profile/edit")
    .post([middleware.authenticate.autntctTkn,middleware.multer.single('profileImage'),middleware.mediaUpload.uploadSingleMediaToS3('profile')], function (req, res) {
        let profileImage;       
        let profileImageData;
        let {name,
            email,
            //password,
            //employeeId,
            //userType,
            gender,
            dob,
            //designation,
            //companyName,
            aboutUs,
            //workEmail,
            phoneNo,
            whatsApp,
            //skype,
            //website,
            instagram,
            facebook,
            linkedin,
            twitter,
            googleMap,
            hangouts,
            youtube,
            snapchat,
            tiktok,
            pinterest,
            github,
            npm,
            stackoverflow, 
            s3ImageData
            //userId
        } = req.body;
        let {user} = req;
        if (s3ImageData) {
            profileImageData = s3ImageData;
            profileImage = s3ImageData.key;
        }
        let clientIp = requestIp.getClientIp(req);
            console.log("params",req.body);
        userFacade.profileEdit({
            user,
            name,
            email,
            //password,
            //employeeId,
            //userType,
            gender,
            dob,
            //designation,
            //companyName,
            aboutUs,
            profileImage,
            profileImageData,
            //workEmail,
            phoneNo,
            whatsApp,
            //skype,
            //website,
            instagram,
            facebook,
            linkedin,
            twitter,
            googleMap,
            hangouts,
            youtube,
            snapchat,
            tiktok,
            github,
            npm,
            stackoverflow, 
            pinterest,
            //userId
        })
        .then(function (result) {
            resHndlr.sendSuccess(res, result,req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err,req);
        })
    });

router.route("/list")
    .post([middleware.authenticate.autntctTkn,middleware.authenticateRole.userRole(constant.ACCOUNT_ROLE.ADMIN), validators.validateUserList], function (req, res) {
        let {search, pageNo, limit, sortField, sortType, status,userType} = req.body;
        let {user} = req;
        userFacade.userList({user, search, pageNo, limit, sortField, sortType,status,userType})
        .then(function (result) {
            resHndlr.sendSuccess(res, result, req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err, req);
        })
    })
    
router.route("/statusChange")
    .post([middleware.authenticate.autntctTkn,middleware.authenticateRole.userRole(constant.ACCOUNT_ROLE.ADMIN), validators.validateStatusChange], function (req, res) {
        let {status,userId} = req.body;
        let {user} = req;
        userFacade.statusChange({user, userId,status})
        .then(function (result) {
            resHndlr.sendSuccess(res, result, req);
        })
        .catch(function (err) {
            resHndlr.sendError(res, err, req);
        })
    })    

module.exports = router;
