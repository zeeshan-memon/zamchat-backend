"use strict";

var jwt = require('jsonwebtoken');
var responseHandler = require('./responsehandler')
var config = require('../config/config')
var crypto = require('./crypto')
 //require('dotenv').config()
module.exports = {

    verfyToke : (req, res, next) => {

        // Get auth header
        var token = req.headers['authorization'];

        if (token !== undefined) {

            jwt.verify(token, 'zamchat', (error, decoded) => {

                if (error) {
                    responseHandler.error("Unauthorized token", res);

                } else {

                    req.user = decoded;
                    next()
                }

            })

        } else {

            responseHandler.error("Token required", res);
        }
    },

    decryption : (req, res, next) => {

        if(config.isHttps){

            req.body =  await crypto.objectDecypt(req.body.d)
            next()
        }

    }



}