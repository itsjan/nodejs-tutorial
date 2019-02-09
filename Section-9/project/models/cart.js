const fs = require('fs')
const path = require('path')

const Product = require('./product')


const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

function calculateCartTotalPrice() {
    return cart.products.reduce((p, c) => {
        console.log({ p, c });
        return p + +c.product.price * c.qty;
    }, 0);
}

const getCart = cb => {
    fs.readFile(p, (err, fileContent) => {
        cart = {
            products: [],
            totalPrice: 0
        }

        if (err) {
            cb(cart)
        } else {
            if (fileContent.length) {
                cart = JSON.parse(fileContent)
            }
            // calculate cart price
            cart.totalPrice = calculateCartTotalPrice()
            cb(cart);
        }
    });
};

const saveCart = (cart) => {
    // calculate cart price
    cart.totalPrice = calculateCartTotalPrice()

    fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err)
    })
}

module.exports = class Cart {

    static addProduct(id, cb) {

        getCart(cart => {

            const existingProduct = cart.products.find(p => p.id == id)

            console.log('existing product -> ', existingProduct)

            let updatedProduct
            if (existingProduct) {
                const tableIndex = cart.products.findIndex(p => p.id == id)

                updatedProduct = { ...existingProduct }
                updatedProduct.qty = existingProduct.qty + 1

                cart.products[tableIndex] = updatedProduct

                saveCart(cart)


            }
            else {
                console.log('Add new item to cart. ID ->', id)
                Product.findById(id, product => {

                    console.table(product)

                    cart.products.push({
                        id,
                        qty: 1
                        , product
                    })
                    saveCart(cart)
                })
            }
            cb(cart)
        })

    }

    static deleteProduct(id, cb) {

        getCart(cart => {

            const productInCart = cart.products.find(p => p.id == id)

            if (productInCart) {
                let updatedProduct
                const tableIndex = cart.products.findIndex(p => p.id == id)
                updatedProduct = { ...productInCart }
                updatedProduct.qty = productInCart.qty - 1
                cart.products[tableIndex] = updatedProduct
            }

            cart.products = cart.products.filter(i => i.qty > 0)

            saveCart(cart)

            cb(cart)
        })


    }

    static get(cb) {

        getCart(cb)
    }

}


