"use strict";

var crypto = require('crypto-js')
var config = require('../config/config')
var encryptoKey = config.encryptoKey;

module.exports = {

    plainTextEncrpt : async (plainText) => {

        return crypto.AES.encrypt(plainText, encryptoKey).toString();
    },

    plainTextDecypt : async (encryptedText) => {

        var bytes = crypto.AES.decrypt(encryptedText, encryptoKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    },

    objectEncrpt : async (object) => {

        return crypto.AES.encrypt(JSON.stringify(object), encryptoKey).toString();
    },

    objectDecypt : async (encryptedObject) => {

        var bytes = crypto.AES.decrypt(encryptedObject, encryptoKey);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

}