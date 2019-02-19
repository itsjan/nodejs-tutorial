const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const {mongoConnect} = require('./util/database')
const { ObjectId } = require('mongodb')

const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use( async (req, res, next) => {
  try {
    user = await User.findById('5c6569645468232f60c0b09b')
  }
  catch (err){
    console.log(err)
  }
  req.user = user
  next()
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  console.log('*** NodeJS server Listening... ***')
  app.listen(3000)
})