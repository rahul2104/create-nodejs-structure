// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../../../constant');

var Schema = mongoose.Schema;
var User;

var UserSchema = new Schema({
    googleId: {
        type: String,
        index: true,
    },
    facebookId: {
        type: String,
        index: true,
    },
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: {
        type: String
    },
    gender: {
        type: Number,
        default: 0, //0 Undefined, 1 Male, 2 Female, 3 Others
        min :0,
        max:3
    },
    name: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        default: ''
    },
    dob: {
        type: String,
        default: ''
    },
    profileImage: {
        type: String,
        default: ''
    },
    isSocialImage: {
        type: Number,
        default: 0 //1 social , 0 non social 
    },
    deviceToken: {
        type: String
    },
    deviceID: {
        type: String,
        index: true,
    },
    deviceTypeId: {
        type: Number,
        default: 1, //1 iOS , 2 android , 3 web
        min:1,
        max:3
    },
    totalPred: {
        type: Number,
        default: 0
    },
    wonPred: {
        type: Number,
        default: 0
    },
    lostPred: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    isGuest: {
        type: Number,
        default: 1
    },
    isVarified: {
        type: Number,
        default: 1
    },
},
);

UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.updated;
    return obj;
};

//Export user module
User = module.exports = mongoose.model(constants.DB_MODEL_REF.USER, UserSchema);


