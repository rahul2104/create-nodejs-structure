// Importing mongoose
var mongoose        = require("mongoose");
var constants = require("../../../constant");


var Schema = mongoose.Schema;
var Cronjob;

var CronjobSchema = Schema(
    {
        userId:{            //add any key
            type: String,
            index: true 
        },
        jobType:Number,    //1 = per min cron for match
        sleepUntil: Date,
        interval: String,   //'* * * * * *',  run every second
        repeatUntil: Date,
        autoRemove: Boolean,
    });
    
//Export user module
Cronjob = module.exports = mongoose.model(constants.DB_MODEL_REF.MONGODBJOB, CronjobSchema);
    