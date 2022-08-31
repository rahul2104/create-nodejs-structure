const STATUS_CODE = {
	ERROR: 0,
	SUCCESS: 1
}

const ACCOUNT_ROLE = {
    USER: 1,
    COMPANY:2,
    ADMIN: 3,
}

const LOGIN_TYPE = {
}

const SOCIAL_ACCOUNT_TYPE = {
	FACEBOOK: 1,
	GOOGLE: 2
}

const DB_MODEL_REF = {
        WHITELIST   : "whitelist",
	USER        : "User",
        USERLOG     : "Userlog",
        MONGODBJOB  : "Mongodbcronjob",
}

const TRANSACTION_TYPE = {
	REFERRAL: 1
}

const NOTIFICATION_TYPE = {
	CHAT: 1,
	
}

const NOTIFICATION_TITLE = {
	CHAT: "New Message",	
}

const DEVICE_TYPE = {
	ANDROID: 1,
	IOS: 2,
        WEB:3
}

const REQUEST_STATUS = {
	SENT: 1,
	RECEIVED: 2,
	ACCEPTED: 3,
	DECLINED: 4,
	CANCEL: 5
}

const REQUEST_API_STATUS = {
	SENT: 'sent',
	ACCEPT: 'accept',
	DECLINE: 'decline',
	CANCEL: 'cancel',
	REMOVE: 'remove'
}

const ADMIN_ACCESS = {
	SENT: 'sent',
	ACCEPT: 'accept',
	DECLINE: 'decline',
	CANCEL: 'cancel',
	REMOVE: 'remove'
}


const MESSAGES = {
        KEY_CANT_EMPTY          : "{{key}} cannot be empty",
	INTERNAL_SERVER_ERROR   : "Please try after some time.",
        EMAIL_ALREADY_EXIST     : "Email already exist",
	INVALID_EMAIL           : "Please fill valid email address.",
	INVALID_PASSWORD        : "Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.",
	VALIDATION_ERROR        : "Validation error.",
	UNAUTHORIZED_ACCESS     : "Unauthorized access.",
	INVALID_PHONE           : "Please fill valid phone number.",
	BLOCKED_PHONE           : "Action blocked for illegal use of services.",
	STRIPE_ERROR            : "Stripe invalid request error.",
	TOKEN_EXPIRED           : "Token link has been expired.",
	SESSION_EXPIRED         : "Your session has expired due to login in another device.",
        INCORRECT_PASS          : "Invalid email or passoword",
        USER_NOT_REGISTERED     : "User has been not registered",
        OLD_PASSWORD_MISMATCH:	"Old password is not correct.",
}

const EMAIL= {
        SUBJECT: {
            VERIFY_EMAIL: 'Mobcoder Contacts : Confirm Email Address',
            FORGOT_PWD_EMAIL: 'Mobcoder Contacts : Reset Password Request',
        },	
    }

// ========================== Export Module Start ==========================
module.exports = Object.freeze({
	STATUS_CODE         : STATUS_CODE,
	ACCOUNT_ROLE        : ACCOUNT_ROLE,
	LOGIN_TYPE          : LOGIN_TYPE,
	SOCIAL_ACCOUNT_TYPE : SOCIAL_ACCOUNT_TYPE,
	DB_MODEL_REF        : DB_MODEL_REF,
	TRANSACTION_TYPE    : TRANSACTION_TYPE,
	MESSAGES            : MESSAGES,
	NOTIFICATION_TYPE   : NOTIFICATION_TYPE,
	NOTIFICATION_TITLE  : NOTIFICATION_TITLE,
	DEVICE_TYPE         : DEVICE_TYPE,
	REQUEST_STATUS      : REQUEST_STATUS,
	REQUEST_API_STATUS  : REQUEST_API_STATUS,
        EMAIL               : EMAIL,
        ADMIN_ACCESS        : ADMIN_ACCESS
});
// ========================== Export Module End ============================