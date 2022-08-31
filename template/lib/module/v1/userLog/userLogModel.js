// Importing mongoose
var mongoose = require("mongoose");
var constants = require("../../../constant");
var Schema = mongoose.Schema;
var userLog;

var userLogSchema = new Schema({
      created: { type: Date, default: Date.now},
      headers:{ type: Object},
      rawHeaders:{ type: String},
      httpVersion:{ type: String},
      method:{ type: String},
      remoteAddress:{ type: String},
      remoteFamily:{ type: String},
      url:{ type: String},
});

//Export States module
userLog = module.exports = mongoose.model(constants.DB_MODEL_REF.USERLOG, userLogSchema);
