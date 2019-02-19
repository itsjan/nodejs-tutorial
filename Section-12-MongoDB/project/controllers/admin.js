const Product = require('../models/product');

exports.getEditProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findById(prodId)

  res.render('admin/edit-product', {
    product,
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: true
  });
}

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

exports.postAddProduct = async (req, res, next) => {

  const product = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
    userId : req.user._id
  }

  await new Product(product).save()
  res.redirect('/admin/products')

};

exports.postEditProduct = async (req, res, next) => {

  const product = {
    _id: req.body.productId,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description
  }
  await new Product(product).update()

  res.redirect('/admin/products')
}


exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll()
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  });
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  await Product.delete(prodId)

  res.redirect('/admin/products');
}
