const dbConfig      = require('./dbConfig');
const expressConfig = require('./expressConfig');
const path          = require('path');
// =================================================================
var cfg = {
        projectName:process.env.PROJECT_NAME,
	environment: process.env.NODE_ENV,
        debug:process.env.DEBUG,
	port: process.env.PORT,
	TAG: process.env.NODE_ENV,
        
        homePath:process.env.HOMEPATH,
        webBasePath:process.env.WEB_BASEPATH,
        
	uploadDir: path.resolve('./uploads'),
        
	sendgridKey: process.env.SENDGRID_KEY,
	//default admin
	adminEmail: process.env.ADMIN_EMAIL,
	adminPassword: process.env.ADMIN_PASSWORD,
        adminName:process.env.ADMIN_NAME,

	mongo: {
            dbName: process.env.DB_NAME,
            dbUrl: process.env.DB_URL,
            options: {
                user: process.env.DB_USER,
		pass: process.env.DB_PASS,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
	},
        
	fcmServerKey: process.env.FCM_SERVER_KEY,
        
	redis: {
            server: process.env.REDIS_SERVER,
            port:process.env.REDIS_PORT,
            namespace:process.env.REDIS_NAMESPACE,
            appname:process.env.REDIS_APP_NAME
	},
        
        basicAuth:{
            name:process.env.BASIC_AUTH_USERNAME,
            pass:process.env.BASIC_AUTH_PASS   
        },
	
	twilio: {
            ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
            AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
            TWILIO_NUMBER: process.env.TWILIO_TWILIO_NUMBER,
            AUTHY_API_KEY: process.env.TWILIO_AUTHY_API_KEY
	},
        
        //aws s3
	iamUser: {
            accessKey: process.env.IAM_ACCESS_KEY,
            keyId: process.env.IAM_KEY_ID,
	},

	// option parameters constantys for s3
	s3: {
            maxAsyncS3: 0, // this is the default
            s3RetryCount: 0, // this is the default
            s3RetryDelay: 0, // this is the default
            multipartUploadThreshold: 20975465, // this is the default (20 MB)
            multipartUploadSize: 15728640, // this is the default (15 MB)
            bucketName: process.env.S3_BUCKET_NAME,
            publicBucketName: process.env.S3_BUCKET_NAME,
            signatureVersion: 'v2',
            region: process.env.S3_BUCKET_REGION,
            acl: 'public-read',
            mediaPath: process.env.MEDIA_PATH
	},
  
        socket:{
            port:process.env.SOCKET_PORT,
        },
        
        smtp:{
            fromEmail:process.env.SENDGRID_FROM_EMAIL,
            errorLogEmail:process.env.ERROR_LOG_EMAIL,
        }

}

// ========================== Export Module Start ==========================
module.exports = {
	cfg,
	dbConfig,
	expressConfig
}
// ========================== Export Module End ============================