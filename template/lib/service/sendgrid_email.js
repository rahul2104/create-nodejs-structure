const config    = require('../config');
const Promise   = require('bluebird');
var ejs         = require('ejs');
const sgMail    = require('@sendgrid/mail');

sgMail.setApiKey(config.cfg.sendgridKey);


function _templateRead(template, params) {
    let filename = "lib/emailTemplate/"+template;
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
    return _templateRead(payload.template,payload)
        .then(function (htmlContent) {
            const msg = {
                to: payload.email,
                from: config.cfg.smtp.fromEmail,
                subject: payload.subject,
                html: htmlContent,
            };
            if(payload.cc){
                msg.cc=payload.cc;
            }
            if(payload.bcc){
                msg.bcc=payload.bcc;
            }
            return sgMail.send(msg)
            .then(function (result) {
                 console.log("email res",result);
                return result;
            }).catch(function (err) {
                 console.log("email err",err)
                throw err;
            })
        })
}



// ========================== Export Module Start ==========================
module.exports = {
    sendEmail
}
// ========================== Export Module End ============================
