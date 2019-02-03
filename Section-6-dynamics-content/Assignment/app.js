const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const userRoutes = require('./routes/users')

app.set('view engine', 'pug')

// parse form inputs
app.use(bodyParser.urlencoded({extended: false}));
// serve content from folder ./public/
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes.router);

app.listen(3000)

