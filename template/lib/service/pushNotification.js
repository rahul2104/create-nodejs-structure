var FCM         = require('fcm-node');
var Promise     = require('bluebird');
var config      = require('../config');

var fcmServerKey    = config.cfg.fcmServerKey; //put your server key here
var fcm             = new FCM(fcmServerKey);

function pushNotification(deviceIds, data){
    data.timestamp = Date.now();
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: deviceIds,
        data: data
    };

    return new Promise(function(resolve, reject){
        fcm.send(message, function(error, response){
            if(error){
                reject(error);
            }
            else{
                resolve(response);
            }
        });
    });
}

// ========================== Export Module Start ==========================
module.exports = {
    pushNotification
}
// ========================== Export Module End ============================