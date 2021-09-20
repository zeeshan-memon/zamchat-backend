'use strict';

var enviroment = process.env.NODE_ENV

console.log(enviroment);

var init = () => {

    var config = {

        dev: {
            dbURI: process.env.DB_URI || 'mongodb://freelance:m9MM4QWSpXo9tBN8gI6sKUKN2pVjWqavyZPIuu6NH16mQ5effuUd3Gbd3AzGkzNYjUnwazkFsKgw9QOKuEDTRg==@freelance.mongo.cosmos.azure.com:10255/freelance?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@freelance@',
            port: process.env.PORT || 3000,
            redisURI: process.env.REDIS_URI || 'www.zamchat.com',
            redisConfig: {
                host: process.env.hostname,
                port: process.env.REDIS_PORT || 6379,
                password: process.env.REDIS_PASSWORD || 'zamchat123',
            },
            isHttps: false,
            isEncryption: false,
            encryptoKey:process.env.ENCRYPTO_KEY,
        },

        stag: {
            dbURI: process.env.DB_URI || 'mongodb://zamchat:zamchat123@127.0.0.1:27017/zamchat',
            port: process.env.PORT || 8000,
            redisURI: process.env.REDIS_URI || 'www.zamchat.com',
            redisConfig: {
                host: process.env.hostname,
                port: process.env.REDIS_PORT || 6379,
                password: process.env.REDIS_PASSWORD || 'zamchat123',
            },
            isHttps: true,
            isEncryption: true,
            encryptoKey:process.env.ENCRYPTO_KEY,
        },

        prod: {
            dbURI: process.env.DB_URI || 'mongodb://zamchat:zamchat123@127.0.0.1:27017/zamchat',
            port: process.env.PORT || 8000,
            redisURI: process.env.REDIS_URI || 'www.zamchat.com',
            redisConfig: {
                host: process.env.hostname,
                port: process.env.REDIS_PORT || 6379,
                password: process.env.REDIS_PASSWORD || 'zamchat123',
            },
            isHttps: true,
            isEncryption: true,
            encryptoKey:process.env.ENCRYPTO_KEY,
        }
    }

    return config[enviroment];
}

module.exports = init()