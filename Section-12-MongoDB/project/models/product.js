const { getDb } = require('../util/database')
const { ObjectId } = require('mongodb')

const COLL = 'products'

class Product {
  constructor(product) {
    this.title = product.title
    this.price = product.price
    this.description = product.description
    this.image = product.image
    this._id = new ObjectId(product._id)
    this.userId = product.userId
  }
  
  async save() {
    const db = getDb()
    const result = await db.collection(COLL).insertOne(this)
  }

  async update() {
    const db = getDb()
 
    const result = await db.collection(COLL)
      .updateOne({ _id: this._id },
        { $set: this})
    
    return result

  }

  static async fetchAll() {
    const db = getDb()
    // returns a cursor
    const result = await db.collection(COLL).find().toArray()

    return result
  }

  static async findById(id) {
    console.log('FIND PRODUCT -> ', id)
    const db = getDb()
    const result = await db.collection(COLL).findOne({ _id: new ObjectId(id) })

    return result;
  }

  static async delete(id) {
    const db = getDb()
    const result = await db.collection(COLL).deleteOne({ _id: new ObjectId(id) })
    console.log(result)
    return result;
  }
}


module.exports = Product;
