const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars')

const app = express();

const admin = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.engine('hbs', handlebars({
    defaultLayout:'main-layout.hbs'
}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', admin.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {pageTitle: '404 - Not Found - Hello from Handlebars'})
});

app.listen(3000);
