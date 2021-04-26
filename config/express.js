"use strict";

const app = require("express")(),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    methodOverride = require("method-override"),
    compression = require('compression'),
    helmet = require('helmet');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

//Simple app that will log all request in the Apache combined format to STDOUT
app.use(morgan('combined'));


// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

// compress all responses
app.use(compression());

// 
app.use(helmet())




module.exports = app;