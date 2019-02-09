const fs = require('fs');
const path = require('path');

const Sql = require('sqlstring')

const db = require('../util/db')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProducts = cb => {
  db.execute('select * from product')
    .then(data => {
      cb(data[0])
    })
};

module.exports = class Product {
  constructor(title, imageurl, description, price, id) {
    this.title = title
    this.imageurl = imageurl
    this.description = description
    this.price = price
    if (id)
      this.id = id
  }

  save(cb) {

    let statement
    if (this.id) {
      statement = `UPDATE product 
      SET title = ${Sql.escape(this.title)},
          imageurl = ${Sql.escape(this.imageurl)},
          description = ${Sql.escape(this.description)},
          price = ${Number.parseFloat(this.price)} 
      WHERE id = ${Sql.escape(this.id)}`
    }
    else {
      statement = `INSERT INTO product (title, imageurl, description, price)
        VALUES ( 
          ${Sql.escape(this.title)},
          ${Sql.escape(this.imageurl)},
          ${Sql.escape(this.description)},
          ${Number.parseFloat(this.price)} )`
    }
    console.log(statement)


    db.execute(statement)
      .then(resp => 
        {
          console.table(resp)
          cb(resp)})
      .catch(err => {
        console.table(err)
        cb(err)})
  }

  static delete(id, cb) {

    const statement = `DELETE FROM product WHERE id = ${Number.parseInt(id)}`

    db.execute(statement)
      .then(resp => {
        console.table(resp[0])
        cb(resp)
      })
      .catch(err => {
        console.log(err)
        cb(err)
      }
      )

  }


  static findById(id, cb) {
    console.log('Find by id ->', id)

    const statement = `SELECT * FROM product WHERE id = ${Number.parseInt(id)}`

    db.execute(statement)
      .then(resp => {
        console.table(resp[0])
        cb(resp[0][0])
      })
      .catch(err => console.log(err))

  }

  static fetchAll(cb) {
    getProducts(cb)
  }
};
