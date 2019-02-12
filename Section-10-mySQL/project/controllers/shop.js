const Product = require('../models/product')
//const Cart = require('../models/cart')
const CartItem = require('../models/cart-item')

exports.getProducts = (req, res, next) => {

  Product.findAll({}).then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })

  })
    .catch(err => console.table(err))
}

exports.getProduct = (req, res, next) => {
  // extract path variable productId
  // from params object
  const prodId = req.params.productId
  Product.findByPk(prodId)
    .then((product) => {
      console.log("Product:")
      console.table(product)
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      })
    })
    .catch(err => console.table(err))
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(err => console.table(err))
}

exports.getCart = async (req, res, next) => {

  let cart = await req.user.getCart()

  if (!cart) {
    cart = await req.user.createCart()
  }
  const products = await cart.getProducts()

  res.render('shop/cart', {
    products,
    path: '/cart',
    pageTitle: 'Your Cart'
  })
}

exports.getCheckout = async (req, res, next) => {

  const cart = await req.user.getCart()
  if (cart) {
    const products = await cart.getProducts()
    const order = await req.user.createOrder()
    await order.addProducts(products.map(p => {
      p.orderItem = {
        qty: p.cartItem.qty
      }
      return p
    }))
    await cart.destroy()
    // toinen vaihtoehto on poistaa ostoskorin tuotteet:
    // cart.setProducts(null)
    // tällöin asiakkaan cart -tietuetta kierrätetään
  }
  res.redirect('/orders')


}

exports.getRemoveProductFromCart = async (req, res, next) => {

  const prodId = req.params.productId

  const cart = await req.user.getCart()
  const products = await cart.getProducts({ where: { id: prodId } })
  const product = products[0]

  const cartItem = await CartItem.findByPk(product.cartItem.id)
  await cartItem.destroy()

  res.redirect('/cart')

}

exports.postCart = async (req, res, next) => {

  const productId = req.body.productId
  const qty = Number.parseInt(req.body.qty)

  let newQuantity = qty

  const cart = await req.user.getCart()
  const products = await cart.getProducts()
  let product
  if (products.length > 0)
    product = products[0]

  if (product) {
    const oldQuantity = product.cartItem.qty
    newQuantity = oldQuantity + newQuantity
  } else {
    product = await Product.findByPk(productId)
  }

  if (newQuantity > 0) {
    await cart.addProduct(product, { through: { qty: newQuantity } })
  }
  else {
    const cartItem = await CartItem.findByPk(product.cartItem.id)
    await cartItem.destroy()
  }

  res.redirect('/cart')

}

exports.getOrders = async (req, res, next) => {
  const orders = await req.user.getOrders({include: ['products']})
  
  res.render('shop/orders', {
    orders,
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

/* exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
}; */
