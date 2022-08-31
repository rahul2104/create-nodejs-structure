// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../../../constant');

var Schema = mongoose.Schema;
var User;

var UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        index: true,
    },
    password: {
        type: String
    },
    userType:{
        type: Number,
        default: 1, //1-user, 2-company,3-admin
    },
    gender: {
        type: Number,
        default: 0, //0 Undefined, 1 Male, 2 Female, 3 Others
        min :0,
        max:3
    },
    dob: {
        type: String,
    },
    designation: {
        type: String,
    },
    companyName: {
        type: String,
    },
    employeeId: {
        type: String,
    },
    aboutUs: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    profileImageData:{},
    workEmail: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    whatsApp: {
        type: String,
    },
    skype:{
        type: String,
    },
    website: {
        type: String,
    },
    instagram: {
        type: String,
    },
    facebook: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    twitter: {
        type: String,
    },
    googleMap:{
        type: String,
    },
    hangouts:{
        type: String,
    },
    youtube:{
        type: String,
    },
    snapchat:{
        type: String,
    },
    tiktok:{
        type: String,
    },
    pinterest:{
        type: String,
    },
    github:{
        type: String,
    },
    npm:{
        type: String,
    },
    stackoverflow:{
        type: String,
    },
    deviceToken: {
        type: String
    },
    deviceID: {
        type: String,
    },
    deviceTypeId: {
        type: Number,
        default: 1, //1 iOS , 2 android , 3 web
        min:1,
        max:3
    },
    status: {
        type: Number,
        default: 1
    },
    isDelete: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
    }
},
);

//Export user module
User = module.exports = mongoose.model(constants.DB_MODEL_REF.USER, UserSchema);


