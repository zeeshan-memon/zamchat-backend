'use strict'
const config = require('../config/config');
const helper = require('../helper/helper');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.DB_URI, {
    define: {
        underscored: false,
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci',
            connectTimeout: 60000
        },
        freezeTableName: true,
        timestamps: false,
    },
    dialect: 'mysql',
    timezone: '-06:00',
    pool: {
        max: 30,
        min: 0,
        idle: 200000,
        acquire: 1000000
    }
});

sequelize.authenticate().then(() => {
    helper.log('Database Connection has been established successfully.');
    // sequelize.sync()
}).catch(err => {
    helper.log('Unable to connect to the database:', err);
});

module.exports.sequelize = sequelize;
