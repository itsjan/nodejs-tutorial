const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const Product = require('./product')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

User.upsert({ id: 1, name: "Admin", email:"admin-email"})


module.exports = User
