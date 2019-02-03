const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin')

const router = express.Router();

router.get('/', (req, res, next) => {
  console.table(adminData.products)
  //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  res.render('shop', {
    prods: adminData.products,
    pageTitle: '*My Shop',
    activeShop: true,
    
  })
});

module.exports = router;
