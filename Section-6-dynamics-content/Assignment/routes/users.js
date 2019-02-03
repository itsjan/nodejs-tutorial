const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
//const adminData = require('./admin')

const router = express.Router();

const users = []

router.get('/', (req, res, next) => {
  res.render('user-form',
    {
      users: users,
      pageTitle: 'Add New User'
    })
});

router.get('/users', (req, res, next) => {
  res.render('users',
    {
      users: users,
      pageTitle: 'Users'
    })
});

router.post('/create-user', (req, res, next) => {
  users.push(req.body.username)
  console.table(users)

  res.redirect('/users')
});

exports.router = router;
exports.users = users;


