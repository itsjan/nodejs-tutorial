const fs = require('fs')
const path = require('path')
const rootDir = require('../util/path')

const p = path.join(
    rootDir,
    'data',
    'products.json')

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContents) => {

        if (!err) {
            cb(JSON.parse(fileContents))
        }
        else cb([])
    })
}

module.exports = class Product {

    constructor(title) {
        this.title = title
    }

    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => console.log(err))
        })
    }

    static fetchAll(cb) {

        getProductsFromFile(products => {
            cb(products)
        })

    }
}
