// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../../constant');

var Schema = mongoose.Schema;


var whiteListSchema = new Schema({
    IP: {
        type: String,
        default: '',
        index:true    
    },
    desc: {
        type: String,  
    },
    status: {
        type: Number,
        default: 1
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//Export whitelist module
module.exports = mongoose.model(constants.DB_MODEL_REF.WHITELIST, whiteListSchema);

