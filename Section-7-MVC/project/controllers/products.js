const Product = require('../models/product')

exports.getProductsPage = (req, res, next) => {
    //console.table(Product.fetchAll())

    const products = Product.fetchAll((products) => {
        console.log('GET PRODUCTS PAGE:')
        console.table(products)

        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length,
            activeShop: true,
            productCSS: true
        });
    })

}

exports.postAddProduct = (req, res, next) => {
    const newProduct = new Product(req.body.title)
    newProduct.save()
    //   products.push({ title: req.body.title });
    res.redirect('/');
}

exports.getAddProductPage = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}
