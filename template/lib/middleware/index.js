var    multer           = require('./multer');
var    authenticate     = require('./authenticate');
var    basicAuth        = require('./basicAuth');
var    mediaUpload      = require('./mediaUpload');
var    authenticateRole = require('./authenticateRole');
var    userLog          = require('./userLog');
var    smartcrop        = require('./smartcrop');
    
// ========================== Export Module Start ==========================
module.exports = {
	multer,
	authenticate,
        basicAuth,
        mediaUpload,
        authenticateRole,
        userLog,
        smartcrop
}
// ========================== Export Module End ============================