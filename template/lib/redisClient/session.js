const Promise = require('bluebird'),
      RedisSessions = require("redis-sessions");

var rs;  
var config = require('../config');
        
var rsapp = config.cfg.redis.appname;
    logger = require('../logger');

//
// Parameters for RedisSession:
//
// e.g. rs = new RedisSession({host:"192.168.0.20"});
//
// `port`: *optional* Default: 6379. The Redis port.
// `host`, *optional* Default: "127.0.0.1". The Redis host.
// `options`, *optional* Default: {}. Additional options. See: https://github.com/mranney/node_redis#rediscreateclientport-host-options
// `namespace`: *optional* Default: "rs". The namespace prefix for all Redis keys used by this module.
// `wipe`: *optional* Default: 600. The interval in seconds after which expired sessions are wiped. Only values `0` or greater than `10` allowed. Set to `0` to disable.
// `client`: *optional* An external RedisClient object which will be used for the connection.
//

var init = function () {
    rs = new RedisSessions({host:config.cfg.redis.server,port:config.cfg.redis.port,namespace:config.cfg.redis.namespace});
}

//create token
exports.create = function (value) {
    return new Promise(function(resolve, reject){
        rs.create({
            app: rsapp,
            id: value.userId,
            ip: value.ip,
            ttl: value.expTime,
            d: value.userObj
        },
        function(err, resp) {
            if(err){
                reject(err);
            }
            if(resp){
                resolve(resp);
            }
          // resp should be something like 
          // {token: "r30kKwv3sA6ExrJ9OmLSm4Wo3nt9MQA1yG94wn6ByFbNrVWhcwAyOM7Zhfxqh8fe"}
        });
    });
}

//update token data
exports.set = function (token,value) {
    return new Promise(function(resolve, reject){
        rs.set({
            app: rsapp,
            token: token,
            d: value
        },
        function(err, resp) {
            if(err){
                reject(err);
            }
            if(resp){
                resolve(resp);
            }
            /*
            resp contains the session with the new values:

            {  
              "id":"user1001",
              "r": 1,
              "w": 2,
              "idle": 1,
              "ttl": 7200, 
              "d":
                {
                  "foo": "bar",
                  "unread_msgs": 12,
                  "last_action": "/read/news",
                  "birthday": "2013-08-13"
                }
            }
            */  
        });
    });
}

//get token detail
exports.getByToken = function (token) {
    return new Promise(function(resolve, reject){
        rs.get({
            app: rsapp,
            token: token
        },
        function(err, resp) {
            if(err){
                reject(err);
            }
            if(resp){
                resolve(resp);
            }
          /*
          resp contains the session:
          {  
            "id":"user1001",
            "r": 2,  // The number of reads on this token
            "w": 2,  // The number of writes on this token
            "idle": 21,  // The idle time in seconds.
            "ttl": 7200, // Timeout after 7200 seconds idle time
            "d":
               {
                "foo": "bar",
                "unread_msgs": 12,
                "last_action": "/read/news",
                "birthday": "2013-08-13"
              }
          }
          */
        });
    });
}

//expair / kill token
exports.expire = function (token) {
    return new Promise(function(resolve, reject){
        rs.kill({
            app: rsapp,
            token: token
        },
        function(err, resp) {
            if(err){
                reject(err);
            }
            if(resp){
                resolve(resp);
            }
            /*
            resp contains the result:

            {kill: 1}
            */  
        });
    });
}

//get user all session/token detail
exports.getByUserId = function (userId) {
    return new Promise(function(resolve, reject){
        rs.soid({
          app: rsapp,
          id: userId
        },
        function(err, resp) {
            if(err){
                reject(err);
            }
            if(resp){
                resolve(resp);
            }
            /*
            resp contains the sessions:

            { sessions: 
               [ { id: 'bulkuser_999',
                   r: 1,
                   w: 1,
                   ttl: 30,
                   idle: 0,
                   ip: '127.0.0.2' },
                 { id: 'bulkuser_999',
                   r: 1,
                   w: 1,
                   ttl: 7200,
                   idle: 0,
                   ip: '127.0.0.1' }
                ] 
            }
            */  
          });
   });
}

//Kill all sessions of an id within an app
exports.expireByUserId = function (userId) {
    return new Promise(function(resolve, reject){
        rs.killsoid({
            app: rsapp, 
            id: userId
        },
        function(err, resp) {
            if(err){
                reject(err);
            }
            if(resp){
                resolve(resp);
            }
            /*
            resp contains the result:

            {kill: 2} // The amount of sessions that were killed
            */  
        });
    });
}


init();