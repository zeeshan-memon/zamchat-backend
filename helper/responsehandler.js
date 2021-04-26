"use strict";

var config = require('../config/config')
var crypto = require('./crypto')

module.exports = {

    error: (error) => {
        if (config.isEncryption) {
            return {
                data: crypto.objectEncrpt({
                    status: false,
                    response: null,
                    error: error.message? error.message:error
                })
            };
        } else {
            return {
                data: {
                    status: false,
                    response: null,
                    error: error.message? error.message:error
                }
            };
        }
    },

    success: (response) => {
        if (config.isEncryption) {
            return {
                data: crypto.objectEncrpt({
                    status: true,
                    response: response,
                    error: null
                })
            };
        } else {
            return {
                data: {
                    status: true,
                    response: response,
                    error: null
                }
            };
        }
    }
}