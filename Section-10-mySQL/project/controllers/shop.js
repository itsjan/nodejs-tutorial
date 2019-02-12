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

exports.getCart = (req, res, next) => {

  req.user.getCart()
    .then(cart => cart.getProducts())
    .then(products => {
      console.table(products)
      res.render('shop/cart', {
        products,
        path: '/cart',
        pageTitle: 'Your Cart'
      })
    })
}

exports.getCheckout = async (req, res, next) => {
  
  const cart = await req.user.getCart()
  const products = await cart.getProducts()
  const order = await req.user.createOrder()
  await order.addProducts(products.map(p => {
    p.orderItem = {
      qty: p.cartItem.qty
    }
    return p
  }))
  //TODO: destroy cart..  
  res.redirect('/order')


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

exports.postCart = (req, res, next) => {

  const productId = req.body.productId
  const qty = Number.parseInt(req.body.qty)
  let userCart
  let newQuantity = qty


  //TODO: Re-implement with await async


  console.log({ newQuantity })

  req.user
    .getCart()
    .then(cart => {
      userCart = cart // store cart
      return cart.getProducts({ where: { id: productId } })
    })
    .then(products => {
      let product
      if (products.length > 0) {
        product = products[0]
      }

      if (product) {
        const oldQuantity = product.cartItem.qty
        newQuantity = oldQuantity + newQuantity
        return product
      }
      console.log(' tuote ei ollut korissa .. haetaan tuote')
      return Product.findById(productId)
    })
    .then(product => {
      if (newQuantity > 0)
        return userCart.addProduct(product, {
          through: { qty: newQuantity }
        })

      return CartItem.findByPk(product.cartItem.id).then(cartItem => cartItem.destroy())
    })
    .then(() => res.redirect('/cart'))
    .catch(err => console.log(err))

}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
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
