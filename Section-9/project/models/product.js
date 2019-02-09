const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
    if (id)
      this.id = id
  }

  save() {
    getProductsFromFile(products => {
      let updatedProducts = [...products]

      if (this.id) {
        const index = products.findIndex(p => p.id == this.id)
        updatedProducts = products.map( p => p.id == this.id ? this : p)
      }
      else {
        this.id = Math.random()
        updatedProducts.push(this);
      }
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
      })
    })
  }

  static delete(id){
    getProductsFromFile(products => {
      const updatedProducts = products.filter( p => p.id != id)  

      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
      })
    })

  }


  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id == id)
      const ret = {
        ... new Product(),
        ...product
      }

      //console.log('Find by ID returns -> ', ret)

      cb(ret)
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }
};
