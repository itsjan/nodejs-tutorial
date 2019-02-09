const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'webapp',
    database: 'node-tutorial',
    password: 'password'
})

module.exports = pool.promise();