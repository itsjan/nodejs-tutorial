const fs = require('fs')
const path = require('path')
const rootDir = require('../util/path')

module.exports = class Product {

    constructor(title) {
        this.title = title
    }

    save() {
        const p = path.join(
            rootDir,
            'data',
            'products.json')

        fs.readFile(p, (err, fileContents) => {
            let products = []

            if (!err) {
                products = JSON.parse(fileContents)
            }
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => console.log(err))
        })
    }

    static fetchAll(cb) {
        const p = path.join(
            rootDir,
            'data',
            'products.json')

          fs.readFile(p, (err, fileContents) => {
            
            if (!err) {
                cb (JSON.parse(fileContents) )
            }
            else cb ( [] )
        
        })
    }
}
