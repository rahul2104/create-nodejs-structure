"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
// Load user service
var _ = require("lodash");
var Promise = require("bluebird");
var ip = require('ip');
var vCardsJS = require('vcards-js');
//========================== Load internal modules ====================

const usrService    = require('./userService');
const userMapper    = require('./userMapper');

const appUtils      = require('../../../appUtils');
const redisSession  = require("../../../redisClient/session");
const customException= require("../../../customException");
const emailService  = require("../../../service/sendgrid_email");
const constant      = require("../../../constant");
const config        = require("../../../config");

//========================== Load Modules End ==============================================

function userLogin(params) {
    return usrService.isEmailExist(params)
    .bind({})
    .then(function (isExist) {
        this.isExist = isExist;

        if (isExist) {
            return usrService.login(params);
        } else {
            throw customException.userNotFound();
        }
    })
    .then(function (response) {
        if (response) {
            this.user = response;
            let tokenObj = _buildUserTokenGenObj(response);
            let userObj = {
                userId: response._id.toString(),
                userObj: tokenObj,
                ip: params.clientIp?params.clientIp:ip.address()
            }
            return redisSession.create(userObj)
        } else {
            throw customException.incorrectPass();
        }

    })
    .then(function (response) {
        return userMapper.loginMapping({ user: this.user, accessToken: response.token });
    });

}


function create(params) {
    return usrService.isEmailExist(params)
    .then(function (result) {
        if(result){
            throw customException.alreadyRegistered();
        }
        return usrService.createUser(params)
    })
    .bind({})
    .then(function(user){
        return userMapper.createMapping({ user: user});
    })
    .catch(function (err) {
        throw err
    })
}

function edit(params) {
    return usrService.isEmailExist(params)
    .then(function (result) {
        if(result){
            throw customException.alreadyRegistered();
        }
        return usrService.updateUser(params)
    })
    .bind({})
    .then(function(user){
        return userMapper.editMapping({ user: user});
    })
    .catch(function (err) {
        throw err
    })
}

function profileEdit(params) {
    return usrService.emailCheck(params)
    .then(function (result) {
        if(result){
            throw customException.alreadyRegistered();
        }
        return usrService.updateUser(params)
    })
    .bind({})
    .then(function(user){
        return userMapper.editMapping({ user: user});
    })
    .catch(function (err) {
        throw err
    })
}


function _buildUserTokenGenObj(user) {
    var userObj = {};
    userObj.deviceToken = user.deviceToken?user.deviceToken:null;
    userObj.deviceTypeID = user.deviceTypeID?user.deviceTypeID:null;
    userObj.deviceID = user.deviceID?user.deviceID:null;
    userObj.userId = user._id.toString();
    userObj.userType = user.userType;
    userObj.status = user.status;
    return userObj;
}


function details(params) {
    return usrService.getByKey({_id:params.userId})
    .bind({})
    .then(function(user){
        if(user){
            return userMapper.detailsMapping({ user: user});
        }else{
            throw customException.getCustomErrorException("Invalid user");
        }
    })
    .catch(function (err) {
        throw err
    })
}

function userInfo(params) {
    return usrService.getByKey({employeeId:params.employeeId.toUpperCase()})
    .bind({})
    .then(function(profileInfo){
        if(!profileInfo){
            throw customException.getCustomErrorException("Invalid user");
        }

        this.profileInfo=profileInfo;
         //create a new vCard
        const vCard = vCardsJS();

        //set properties
        vCard.firstName = profileInfo.name;
        vCard.organization = profileInfo.companyName;
        vCard.photo.attachFromUrl(profileInfo.profileImage, 'JPEG');
        vCard.workPhone = profileInfo.phoneNo;
        vCard.title = profileInfo.designation;
        vCard.url = profileInfo.website;
        vCard.email =  profileInfo.email;
        vCard.workEmail = profileInfo.email;
        vCard.socialUrls['facebook'] = "http://fb.me/"+profileInfo.facebook;
        vCard.socialUrls['linkedIn'] = profileInfo.linkedIn;
        vCard.socialUrls['twitter'] = "https://twitter.com/"+profileInfo.twitter;
        vCard.socialUrls['instagram'] = "https://www.instagram.com/"+profileInfo.instagram;
        vCard.note = 'Mobcoder Contacts';

        //get as formatted string
        console.log(vCard.getFormattedString());    
        //save to file
        setTimeout(function(){ 
            return vCard.saveToFile('./download/'+profileInfo.employeeId+'.vcf');
        }, 3000);
    })
    .then(function(result){
        console.log("result",result);
        this.profileInfo.contactFile=config.cfg.homePath+'/download/'+this.profileInfo.employeeId+'.vcf';
        return userMapper.detailsMapping({ user:this.profileInfo});
    })
    .catch(function (err) {
        throw err
    })
}

function forgetPassword(params) {
    return usrService.getByKey({email:params.email})
    .bind({})
    .then(function (result) {
        this.user=result;
        if (!result) {
            throw customException.userNotFound();
        }
        let tokenObj = _buildUserTokenGenObj(result);
        let userObj = {
            userId: result._id.toString(),
            userObj: tokenObj,
            ip: params.clientIp?params.clientIp:ip.address()
        }
        return redisSession.create(userObj)
    })
    .then(function(response){
        let payload={
            email:params.email,
            template:"forgot.ejs",
            subject:constant.EMAIL.SUBJECT.FORGOT_PWD_EMAIL,
            name:this.user.name,
            link:config.cfg.webBasePath+"/auth/reset/"+response.token
        }
        return emailService.sendEmail(payload)
    })
    .then(function(params){
        return userMapper.forgetMapper(params)
    })
    .catch(function (err) {
        throw err
    })
}

function resetPassword(params) {
    return usrService.update({_id:params.user.userId},{password:appUtils.createHashSHA256(params.password)})
    .then(function(result){
        redisSession.expireByUserId(params.user.userId)
        return userMapper.resetMapper(params)
    })
    .catch(function (err) {
        throw err
    })
}

function contactFile(params) {
    return usrService.getByKey({employeeId:params.employeeId.toUpperCase()})
    .bind({})
    .then(function(profileInfo){
        if(!profileInfo){
            throw customException.getCustomErrorException("Invalid user");
        }

        this.profileInfo=profileInfo;
         //create a new vCard
        const vCard = vCardsJS();

        //set properties
        vCard.firstName = profileInfo.name;
        vCard.organization = profileInfo.companyName;
        vCard.photo.attachFromUrl(profileInfo.profileImage, 'JPEG');
        vCard.workPhone = profileInfo.phoneNo;
        vCard.title = profileInfo.designation;
        vCard.url = profileInfo.website;
        vCard.email =  profileInfo.email;
        vCard.workEmail = profileInfo.email;
        vCard.socialUrls['facebook'] = "http://fb.me/"+profileInfo.facebook;
        vCard.socialUrls['linkedIn'] = profileInfo.linkedIn;
        vCard.socialUrls['twitter'] = "https://twitter.com/"+profileInfo.twitter;
        vCard.socialUrls['instagram'] = "https://www.instagram.com/"+profileInfo.instagram;
        vCard.note = 'Mobcoder Contacts';

        //get as formatted string
        console.log(vCard.getFormattedString());    
        //save to file
        setTimeout(function(){ 
            return vCard.saveToFile('./download/'+profileInfo.employeeId+'.vcf');
        }, 3000);
    })
    .then(function(result){
        console.log("result",result);
        let filePath=config.cfg.homePath+'/download/'+this.profileInfo.employeeId+'.vcf';
        return userMapper.contactFileMapper({ user:this.profileInfo,filePath:filePath});
    })
    .catch(function (err) {
        throw err
    })
}


function changePassword(params){
    return usrService.getByKey({_id:params.user.userId,password:appUtils.createHashSHA256(params.oldPassword)})
        .then(function (result) {
            if (!result) {
                throw customException.getCustomErrorException(constant.MESSAGES.OLD_PASSWORD_MISMATCH)
            }
            return usrService.update({_id:params.user.userId},{password:appUtils.createHashSHA256(params.password)})
        })
        .then(function (result) {
            return userMapper.changePasswordMapper(result)
        })
        .catch(function (err) {
            throw err
        })
}


function userList(params){
    return Promise.join(usrService.userList(params),usrService.count(params))
    .then(function (userRes) {
        return userMapper.userListMapper({result:userRes[0],totalCount:userRes[1]})
    })
    .catch(function (err) {
        throw err
    })
}


function statusChange(params){
    return usrService.update({_id:params.userId},{status:params.status})
        .then(function (result) {
            return userMapper.statusChangeMapper(result)
        })
        .catch(function (err) {
            throw err
        })
}
//========================== Export Module Start ==============================

module.exports = {
    userLogin,
    create,
    edit,
    details,
    forgetPassword,
    resetPassword,
    userInfo,
    contactFile,
    changePassword,
    profileEdit,
    userList,
    statusChange
};

//========================== Export Module End ================================