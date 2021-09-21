const db = require('../config/sequelize').sequelize
const Sequelize = require('sequelize');

module.exports = {
    accounts: require('./accounts').model(db, Sequelize),
    scheduling: require('./scheduling').model(db, Sequelize),
    charityCategories: require('./charitycategories').model(db, Sequelize),
    contactus: require('./contactus').model(db, Sequelize),
    states: require('./states').model(db, Sequelize),
    cites: require('./cities').model(db, Sequelize),
    drivers: require('./drivers').model(db, Sequelize),
    plannings: require('./planning').model(db, Sequelize),
    routesplan: require('./routesplan').model(db, Sequelize),
    stores: require('./stores').model(db, Sequelize)
}
