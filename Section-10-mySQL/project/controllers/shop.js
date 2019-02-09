const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {

  Product.fetchAll()
    .then(([products, metadata]) => {
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
  Product.findById(prodId)
    .then(([products, metadata]) => {
      res.render('shop/product-detail', {
        product: products[0],
        pageTitle: products[0].title,
        path: '/products'
      })
    })
    .catch(err => console.table(err))
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([products, metadata]) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
        .catch(err => console.table(err))
    })
}

exports.getCart = (req, res, next) => {

  Cart.get(cart => {
    console.table(cart)
    res.render('shop/cart', {
      cart,
      path: '/cart',
      pageTitle: 'Your Cart'
    })
  })

}

exports.postCart = (req, res, next) => {
  const productId = req.body.productId
  const add = +req.body.qty
  console.log('Post cart -> ', { productId, add })

  if (add > 0)
    Cart.addProduct(productId, () => {
      res.redirect('/cart')
    })
  else
    Cart.deleteProduct(productId, () => {
      res.redirect('/cart')
    })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
