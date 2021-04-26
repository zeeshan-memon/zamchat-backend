'use strict';

const mongoose = require('mongoose');
const config = require('./config')

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    //autoIndex: false, // Don't build indexes
    //reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
   // reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
   // bufferMaxEntries: 0,
   // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
   // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    //family: 4 // Use IPv4, skip trying IPv6
};

module.exports = mongoose.connect(config.dbURI, options)

// mongoose.connect(config.dbURI, options, (error) => {

//     if (error) {
//         console.log(error);
//         console.log("Mongoose not connected!");
//     } else {
//         console.log("Mongoose Connected");

//     }
// });
mongoose.connection.on('connected', function(){
    console.log("Mongoose default connection is open");
});

mongoose.connection.on('error', function(err){
    console.log(error("Mongoose default connection has occured "+err+" error"));
});

mongoose.connection.on('disconnected', function(){
    console.log("Mongoose default connection is disconnected");
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0)
    });
});

// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log("ZZZZZZZZZZ");
  
// });