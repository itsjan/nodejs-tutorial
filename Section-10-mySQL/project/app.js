const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/db')

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))

})


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);


User.hasOne(Cart)
Cart.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, constraints: true, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })


Order.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, constraints: true, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
Order.belongsToMany(Product, {through: OrderItem})
Product.belongsToMany(Order, {through: OrderItem})
User.hasMany(Order)


sequelize
    //.sync()
    .sync({ force: true })
    .then(result => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user)
            return User.create({ name: 'Jan', email: 'test.com' })
        return user
    })
    .then(user => {

        console.log('then create cart for user', user)
        return user.createCart()
    })
    .then(cart => {
        return Product.create({ title: 'Tuote', 
        price: 199, 
        description: 'Product description', 
        imageUrl : 'https://via.placeholder.com/250',
        userId: cart.userId })
            .then(product => { return { cart, product } })

    })
    .then(result => {
        console.log('Create cart item...')
        return CartItem.create({ cartId: result.cart.id, productId: result.product.id, qty: 1 })
    })
    .then(cartItem => {
        
        console.log("Listening...")
        app.listen(3000)
    })

    .catch(err => {
        console.table(err)
    })



