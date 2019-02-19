const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
  let products
  try {
    products = await Product.fetchAll()
  }
  catch (err) {
    console.log(err)
  }
  console.table(products)

  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  })

}

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  let product
  try {
    product = await Product.findById(prodId)
  }
  catch (err) {
    console.log(err)
  }

  res.render('shop/product-detail', {
    product: product,
    pageTitle: product.title,
    path: '/products'
  })
}

exports.getIndex = async (req, res, next) => {
  let products;
  try {
    products = await Product.fetchAll()
  }
  catch (err) {
    console.log(err)
  }
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  })
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    cart: req.user.cart
  });
}

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;

  let product
  try {
    product = await Product.findById(prodId)   
    await req.user.addToCart(product, 1)
    res.redirect('/cart');
  }
  catch (err) {
    console.log(err)
  }
}

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    await req.user.removeFromCart(prodId)
    res.redirect('/cart');
  }
  catch (err) {
    console.log(err)
  }

}

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
