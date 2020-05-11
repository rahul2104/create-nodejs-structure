const config = require('../config');
const nodemailer = require("nodemailer");
const Promise = require('bluebird');
var ejs = require('ejs');

function _templateRead(template,param){
    let filename = "../emailTemplate/"+template;
    ejs.renderFile( filename, param,
      function (err, htmlData) {

      if(htmlData){
          return htmlData;
      }

    });
}

function sendEmail(payload){

	var fromEmail = config.cfg.smtp.fromEmail;
	var toEmail = payload.to;
	var subject = payload.subject;
	var content = _templateRead(payload.template,payload);

        let smtpTransport = nodemailer.createTransport({
            host: config.cfg.smtp.host,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: config.cfg.smtp.auth.user,
                pass: config.cfg.smtp.auth.pass,
            }
        });
        // setup email data with unicode symbols
        let mailOptions = {
            from: fromEmail, // sender address.  Must be the same as authenticated user if using Gmail.
            to: toEmail, // receiver
            subject: subject, // subject
            html: content // html body
        };
        return new Promise( function ( resolve , reject ) {
            smtpTransport.sendMail({mailOptions}, function(err, data){
                    if( err){
                            return reject( err )
                            }
                    resolve( data );
                })
        })

}

// ========================== Export Module Start ==========================
module.exports = {
	sendEmail
}
// ========================== Export Module End ============================