const fs = require('fs')

const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);



module.exports = class Cart {

    static addProduct(id, productPrice) {

        fs.readFile(p, (err, fileContents) => {

            let cart = {
                products: [],
                totalPrice: 0
            }

            if (!err) {
                cart = JSON.parse(fileContents)
            }

            const existingProduct = cart.products.find(p => p.id == id)

            console.log(existingProduct)

            let updatedProduct
            if (existingProduct) {
                const tableIndex = cart.products.findIndex(p => p.id == id)

                updatedProduct = { ...existingProduct }
                updatedProduct.qty = existingProduct.qty + 1

                cart.products[tableIndex] = updatedProduct


            }
            else {
                cart.products.push({ id, qty: 1 })
            }

            cart.totalPrice = cart.totalPrice + +productPrice

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err)
            })

        })
        // fetch the previous cart
        // find existing product 
        // add new / increase quantity
    }


}   