// Importing mongoose
var mongoose = require("mongoose");
var constants = require("../../../constant");

var Schema = mongoose.Schema;
var Admin;

var AdminSchema = new Schema({
        name:{type:String},
        email: {type: String, required: true, unique: true}, // emailId of admin will be username
        isVerified: {type: Number, default: 1},
        status: {type: Number, default: 1},
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
        password:{type:String},
    });

//Export admin module
Admin = module.exports = mongoose.model(constants.DB_MODEL_REF.ADMIN, AdminSchema);
