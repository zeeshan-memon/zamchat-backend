'use strict';

const config = require('./config/config');
const app = require('./config/express');
const express = require('express');
const http = require('http');
const https = require('https');
const apiRoutes = express.Router();
app.use('/api/v1', apiRoutes);
require('./routes/index')(apiRoutes);
let cronJob = require("cron").CronJob;
const server = (config.isHttp) ? https.Server(app) : http.Server(app);
var cluster = require('cluster');
var os = require('os');
if (cluster.isMaster) {
  for (var i = 0; i < os.cpus().length; i++) {
    console.log('fork child');
    cluster.fork();
  }

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
}
//Cron Job Start
//========== corn job for auto merchant invoice 
var accounts = require("./controllers/accounts");
new cronJob(
  "0 0 8 * * *",
  () => {
    console.log("You will see this message every day at 8:00 AM ", new Date());
    if(process.env.NODE_APP_INSTANCE === '0' ){
      console.log("autoSendSmsCalled");
    accounts.autoSendSms();
  }
  },
  null,
  true
);
//Cron Job End

//Cron Job Start
//========== corn job for auto merchant invoice 
var routesPlan = require("./controllers/routesplan");
new cronJob(
  "0 30 23 * * *",
  () => {
    console.log("You will see this message every day at 12:00 AM ", new Date());
    routesPlan.updateOrderStatusCompleted();
  },
  null,
  true
);
//Cron Job End

/**
 * ===================================================================================================================
 * Request to log port number on which server listen the requests.
 * ===================================================================================================================
 **/
if (process.env.NODE_ENV !== 'test') {
  server.listen(config.PORT, () => {
    console.log('listening on ' + config.PORT);
  });
}

module.exports = server;
