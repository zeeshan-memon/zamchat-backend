'use strict';

/**
 * Initialize Socket.io
 * Uses Redis as Adapter for Socket.io
 *
 */

module.exports = (server) => {

    var io = require('socket.io')(server);
    io.set('transports', ['websocket']);
    // var app =require('./express')
    // app.set('io',io)
    io.on("connection", (socket) => {

        // it's for get uid of perticular user and then create sepreate room for user
        let id = socket.handshake.query.id;
        console.log("new user connected");
        console.log("ID = " + id);
        // socket.join(id)
        socket.join(id, function () {
            console.log(socket.id + " now in rooms ", socket.rooms);
            //io.to(socket.id).emit("message", "Hi " + id + "Welcome to ZamChat")
        });


        socket.on('message', (data) => {
            console.log("Message event triggered");

            console.log(data);

        });

        socket.on('candidate', (data) => {
            console.log("candidate event triggered");

           // console.log(data);
            var receiver = data.receiver
            var sender = data.sender
            var candidate = data.candidate
           // io.to(receiver).emit('candidate',data);
            socket.broadcast.emit('candidate',data)

        });

        socket.on('offer', (data) => {
            console.log("offer event triggered");

           // console.log(data);
            var receiver = data.receiver
            var sender = data.sender
            var offer = data.offer
            io.to(receiver).emit('offer',data);

        });

        socket.on('answer', (data) => {
            console.log("answer event triggered");

            console.log(data);
            var receiver = data.receiver
            var sender = data.sender
            var answer = data.answer
            io.to(receiver).emit('answer',data);

        });

        socket.on('endcall', (data) => {
            console.log("endcall event triggered");

            console.log(data);
            var receiver = data.receiver
            var sender = data.sender
            io.to(receiver).emit('endcall',{message:"bye"});

        });

        socket.on('disconnect', (socket) => {

            console.log(socket + " user left");

        });
    });
    return io
}