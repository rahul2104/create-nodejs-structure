var    multer          = require('./multer');
var    authenticate    = require('./authenticate');
var    basicAuth       = require('./basicAuth');
var    mediaUpload     = require('./mediaUpload');
    
// ========================== Export Module Start ==========================
module.exports = {
	multer,
	authenticate,
        basicAuth,
        mediaUpload
}
// ========================== Export Module End ============================