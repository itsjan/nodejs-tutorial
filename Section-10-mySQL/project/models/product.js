const fs = require('fs');
const path = require('path');

const Sql = require('sqlstring')

const db = require('../util/db')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

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
   
    return db.execute(statement)
  }

  static delete(id, cb) {
    const statement = `DELETE FROM product WHERE id = ${Number.parseInt(id)}`
    return db.execute(statement)
  }


  static findById(id) {
    const statement = `SELECT * FROM product WHERE id = ${Number.parseInt(id)}`
    return db.execute(statement)
  }


  static fetchAll() {
    return db.execute('select * from product')
  }


};
