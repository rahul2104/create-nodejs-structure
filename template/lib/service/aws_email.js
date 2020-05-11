'use strict';
//========================== Load External modules ====================
const aws = require('aws-sdk');
const Promise = require('bluebird');
const ejs = require('ejs');
//========================== Load internal modules ====================
const config = require('../config');

aws.config = {
    accessKeyId: config.cfg.iamUser.keyId,
    secretAccessKey: config.cfg.iamUser.accessKey,
    //region: options.cfg.s3.region,
    bucketName: config.cfg.s3.bucketName,
    signatureVersion: config.cfg.s3.signatureVersion,
};

// Create a new SES object. 
var ses = new aws.SES();

// The character encoding for the email.
const charset = "UTF-8";
const configuration_set = "ConfigSet";
//========================== Load Modules End ==============================================


function _templateRead(template, params) {
    let filename = "../emailTemplate/"+template;
    return new Promise(function (resolve, reject) {
        ejs.renderFile(filename, params, function (error, htmlData) {
            if (error) {
                console.log("_templateRead err", error)
                reject(error);
            }
            resolve(htmlData);
        });
    });
}


function sendEmail(payload) {
    return _templateRead(payload.template, payload)
        .then(function (htmlContent) {
            // Specify the parameters to pass to the API.
            var params = {
                Source: config.cfg.smtp.fromEmail,
                Destination: {
                    ToAddresses: [
                        payload.to
                    ],
                },
                Message: {
                    Subject: {
                        Data: payload.subject,
                        Charset: charset
                    },
                    Body: {
                        Html: {
                            Data: htmlContent,
                            Charset: charset
                        }
                    }
                },
                ConfigurationSetName: configuration_set
            };

            return new Promise(function (resolve, reject) {
                //Try to send the email.
                ses.sendEmail(params, function (err, data) {
                    // If something goes wrong, print an error message.
                    if (err) {
                        console.log(err.message);
                        return reject(err)
                    } else {
                        console.log("Email sent! Message ID: ", data.MessageId);
                        resolve(data);
                    }
                });
            });
        });
}

// ========================== Export Module Start ==========================
module.exports = {
    sendEmail
}
// ========================== Export Module End ============================