const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const User = require('./user')

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageurl: {
    type: Sequelize.STRING(1000)
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
})

Product.upsert({ id: 1, title: "Default Product", imageurl:"https://via.placeholder.com/250", price: 10.99, description:"This is a generic product for demonstration purposes"})


module.exports = Product
