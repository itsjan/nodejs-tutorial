const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    product: {},
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  })
}

exports.getEditProduct = (req, res, next) => {
  // fetch from the url parameters
  const prodId = req.params.productId
  // fetch from the query parameters
  const edit = req.query.edit  // ...?edit=true

  if (edit) {
    console.log("EDIT PRODUCT ->", { prodId, edit })

    Product.findByPk(prodId)
      .then((product) => {
        res.render('admin/edit-product', {
          product: product,
          pageTitle: 'Edit Product',
          path: '/admin/edit-product'
        })
      })
      .catch(err => console.table(err))
  }
}

// add or update a product
exports.postProduct = (req, res, next) => {

  // get productId from the hidden form field
  const prodId = req.body.productId
  // get form input values
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.insertOrUpdate({
    id: prodId, title: title, imageurl: imageUrl, description: description, price: price
  }).then(result => {
    console.log(result)
    res.redirect('/admin/products')
  })
    .catch(err => console.log(err))
}

exports.getDeleteProduct = (req, res, next) => {
  // fetch from the url parameters
  const prodId = req.params.productId
  // fetch from the url query parameters
  const confirm = req.query.confirm

  if (confirm) {
    // User were shown a confirmation dialog ...
    Product.findByPk(prodId)
      .then(product => product.destroy())
      .then(() => {
        res.redirect('/admin/products')
      })
  }
  else {
    Product.findByPk(prodId)
      .then((product) => {
        res.render('admin/delete-product', {
          product,
          pageTitle: 'Delete Product',
          path: '/admin/delete-product'
        })
      })
  }
}

exports.getProducts = (req, res, next) => {
  Product.findAll({})
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      })
    }).catch(err => console.table(err))

};