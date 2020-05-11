const MongoClient   = require('mongodb').MongoClient,
      MongoCron     = require('mongodb-cron').MongoCron,
      moment        = require('moment');

const constants     = require('./constant');

const config        = require('./config');

const dbName      = config.cfg.mongo.dbName;
const dbUrl       = config.cfg.mongo.dbUrl;
const dbOptions   = config.cfg.mongo.options;
const dbAuthUrl   = config.cfg.mongo.dbAuthUrl;


function cronjobFunction(doc) {
    console.log('doc..####',doc);
    if(doc != undefined && doc.jobType==1) 
    {
        console.log('doc...',doc);

    }

}
 
// Use connect method to connect to the server
MongoClient.connect(dbAuthUrl, { useNewUrlParser: true }, function(err, client){
    if(err){
      console.log(err);
    }

    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('mongodbcronjobs');

    const cron = new MongoCron({
        collection,
        onDocument      : async (doc) => cronjobFunction(doc), 
        onError         : async (err) => console.log(err),
        onStart         : () =>  {console.log('start....')},
        onStop          : () =>  {console.log('stop....')},
        nextDelay       : 1000,
        reprocessDelay  : 1000,
        idleDelay       : 10000,
        lockDuration    : 600000
    });

    cron.start(); // start processing

});