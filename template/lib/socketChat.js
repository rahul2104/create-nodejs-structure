//========================== Load Modules Start ===========================
const socketio      = require('socket.io');
const http          = require('http');
const express       = require('express');
const { instrument } = require("@socket.io/admin-ui");
//========================== Load internal Module =========================
const userService   = require('./module/v1/user/userService');
//const messageService= require('./module/message/messageService');
//const groupService  = require('./module/group/groupService');

const middleware    = require('./middleware');
const config        = require('./config');
//========================== Load Modules End =============================
const app = express();
const server = http.createServer(app);
server.listen(config.cfg.socket.port);

const io = socketio(server, {
    transports: ['polling', 'websocket'],
    cors: {
      origin: ["http://localhost:4000",config.cfg.webBasePath],
      methods: ["GET", "POST"],
      credentials: true
    }
});

instrument(io, {
    auth: {
      type: "basic",
      username: "vcards-socket-admin",
      password: "$2b$10$heqvAkYMez.Va6Et2uXInOnkCT6/uQj1brkrbyG3LpopDklcq7ZOS" // "changeit" encrypted with bcrypt
    },
  });

//socket access token authenticate
io.use(middleware.authenticate.authSocketTkn)

io.sockets.on('connection', function (socket) {
    console.log('*** user ***');
    console.log('socket.id',socket.id);
    //console.log('socket.user',socket.user);
    //console.log(socket.handshake);
    if(socket.user){
        addSocketID(socket);
        socketDisconnections(socket);
//        groupAdd(socket);
//        socketDisconnectionsGroup(socket);
//        groupMessaging(socket);
//        messaging(socket);
    }

});

function addSocketID(socket) {
    var userId=socket.user._id;
    if(userId&&socket.payload.isAdmin==0){
        userService.updateUser({_id:userId}, {$addToSet: {socketId: socket.id}})
        .bind({})
        .then(function (user) {
            if(user){
                console.log("socket Id add");
                //console.log(user);
                socket.broadcast.emit('online', {user: user});
            }else{
                console.log("invalid user id");
                console.log(userId);
            }
        })
        .catch(function (err) {
            throw err;
        })
    }else{
        adminService.update({_id:userId}, {$addToSet: {socketId: socket.id}})
        .bind({})
        .then(function (user) {
            if(user){
                console.log("socket Id add");
                //console.log(user);
                socket.broadcast.emit('online', {user: user});
            }else{
                console.log("invalid user id");
                console.log(userId);
            }
        })
        .catch(function (err) {
            throw err;
        })
    }
}

function groupAdd(socket){
    socket.on('groupAdd', function (matchId) {
        console.log('matchId',matchId);
        groupService.update({matchId:matchId}, {$addToSet: {socketId: socket.id,userId:socket.user._id}})
        .bind({})
        .then(function (group) {
            console.log('group',group);
            if(group){
                console.log("socket Id add in group");
                socket.join(group._id, () => {
                    let rooms = Object.keys(socket.rooms);
                    console.log('rooms',rooms); // [ <socket.id>, 'room 237' ]
                });
            }
        })
        .catch(function (err) {
            throw err;
        })
    })
}

function socketDisconnections(socket) {
    socket.on('disconnect', function () {
        userService.updateUser({socketId: socket.id}, {$pull: {socketId: socket.id}})
        .bind({})
        .then(function (user) {
            console.log('user disconnected');
            socket.broadcast.emit('offline', {user: user});
        })
        .catch(function (err) {
            throw err;
        })
    });
}

function socketDisconnectionsGroup(socket) {
    socket.on('disconnect', function () {
        groupService.update({socketId: socket.id}, {$pull: {socketId: socket.id}})
        .bind({})
        .then(function (user) {
            console.log('user disconnected from group');
        })
        .catch(function (err) {
            throw err;
        })
    });
}

function groupMessaging(socket){
    socket.on('groupSend', function (msg,groupId,matchId) {
         groupService.getByKey({_id:groupId,matchId:matchId})
        .bind({})
        .then(function (group) {
            this.group=group;
            var socketArr=group.socketId;
            //groupId => chat room id 
            socket.broadcast.to(groupId).emit('groupMsg', {msg: msg,group:groupId,user:socket.user});
            
            var chatMsg = {
                userId: socket.user._id,
                matchId: matchId,
                groupId: groupId,
                message: msg,
                created: new Date(),
                isRemove: 0,
                status: 1
            };
            return messageService.create(chatMsg);
        })
        .catch(function (err) {
            throw err;
        })
    });
}


function messaging(socket){
    socket.on('messageSend', function (msg,userId) {
         userService.getByKey({_id:userId})
        .bind({})
        .then(function (toUser) {
            this.toUser=toUser;
           
            var socketArr=toUser.socketId;
                
            for(var i=0;i<socketArr.length;i++){
                socket.broadcast.to(socketArr[i]).emit('messageRecive', {msg: msg,name:toUser.name});
            }
            
            var chatMsg = {
                userId  : socket.user._id,
                toUserId: userId,
                message : msg,
                created : new Date(),
                isRemove: 0,
                status  : 1
            };
            return messageService.create(chatMsg);
        })
        .catch(function (err) {
            throw err;
        })
    });
}