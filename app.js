'use strict';

var config = require('./config/config');
const app = require('./config/express');
const http = require('http');
const https = require('https');
        require('./config/mongo')
//var io = require('./config/socket');
var resposne = require('./helper/responsehandler')
const models = require('./models/accounts')
var server = (config.isHttp) ? https.Server(app) : http.Server(app);
// var io = require('./config/socket')(server);
   // io.set('transports', ['websocket']);
    //var app = require('./express');
    //another way to access socket
    // app.set('io',io);

   

app.get('/frontend', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  // app.get('/chat', function (req, res) {
  //   //let io = req.app.get("io")   
  //   io.sockets.to('zeeshan').emit('answer', {"data":"payload"})
  //  var data = {message:"Message Sended...",age:12}
  //   res.status(200).json(resposne.success(data))
  // });
  app.get('/users', (req, res) => {
    const query = models.findOne({  })
    query.exec((err, doc) => {
        if (err) {
            return res.json({
                status: false,
                message: err
            })
        }
        else {
            
                return res.json({
                    status: true,
                    data: doc,
                })
           
        }
    })
})

server.listen(config.port, () => {
    console.log('listening on ' + config.port);
});

// app.get('', (req, res) => {

//     res.json({
//         message: "Working perfect"
//     })
// })
