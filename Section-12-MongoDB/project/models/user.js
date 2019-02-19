const { getDb } = require('../util/database')
const { ObjectId } = require('mongodb')

const COLL = 'users'

class User {
  constructor(user) {
    this.name = user.name
    this.email = user.email
    this.cart = user.cart != null ? user.cart : { items: [] }
    this._id = new ObjectId(user._id)
  }

  async save() {
    const db = getDb()
    console.log(' USER SAVE ')
    console.log('SAVE --> ', this)

    const result = await db.collection(COLL).save(this)
    return result
  }

  async saveCart() {
    console.log('Saving cart..')
    const db = getDb()
    return await db.collection(COLL).updateOne(
      { _id: this._id },
      {
        $set:
          { cart: this.cart }
      })
  }

  async addToCart(product, qty) {

    const newItems = this.cart.items.map(
      item => item._id.equals(product._id) ? {
        ...item,
        qty: item.qty + qty
      } : item)

    let index = -1
    if (newItems.length > 0) {
      index = newItems.findIndex(i => i._id.equals(product._id))
    }

    if (index < 0) {
      let newProduct = {
        ...product,
        qty
      }
      newItems.push(newProduct)
    }

    this.cart.items = newItems

    return await this.saveCart()

  }

  async removeFromCart(id) {

    const updatedItems = this.cart.items.filter(item => item._id.equals(id) === false)
    this.cart.items = updatedItems

    return await this.saveCart()

  }

  static async findById(id) {
    console.log('FIND USER BY ID ->', id)
    const db = getDb()
    const user = await db.collection(COLL).findOne({ _id: new ObjectId(id) })
    return new User(user)
  }


}



module.exports = User;