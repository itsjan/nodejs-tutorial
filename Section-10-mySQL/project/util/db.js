const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-tutorial', 'webapp', 'password',
    { dialect: 'mysql', host: 'localhost' })


module.exports = sequelize
