const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-tutorial', 'webapp', 'password',
    { dialect: 'mysql', host: 'localhost' })


module.exports = sequelize


/*
const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'webapp',
    database: 'node-tutorial',
    password: 'password'
})

module.exports = pool.promise();
*/