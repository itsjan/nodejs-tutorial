const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    qty: Sequelize.INTEGER
})

module.exports = OrderItem