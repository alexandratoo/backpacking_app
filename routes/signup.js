var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.render('signup', {
    title: 'Create New Account'
  });
});

router.post('/', validateCreate, validateEmail, hashPassword, (req, res, next) => {
  let {
    firstName,
    lastName,
    photo,
    phone,
    streetAddress,
    city,
    state,
    zipcode,
    email,
    hashed_password,
  } = req.body
  // console.log(req.body);
  insertUser(humps.decamelizeKeys({
    firstName,
    lastName,
    photo,
    phone,
    streetAddress,
    city,
    state,
    zipcode,
    email,
    hashed_password
    }))
    .then(data => {
      console.log(data[0].id, req.body.email);
      let token = jwt.sign({
        id: data[0].id
      }, 'shhh')
      // console.log(token)
      res.cookie('token', token, {
        httpOnly: true
      })
// May change later. for now redirects to trips
      // res.redirect(`users/${data[0].id}`)
      res.redirect('trips')

    })
    .catch(err => {
      console.log(err);
      res.end()
    })
  // res.render('index')
  // console.log(req.body.hashed_password);
})

function validateCreate(req, res, next) {
  if (!req.body.password || !req.body.email || !req.body.firstName || !req.body.lastName) {
    next(boom.create(400, "Please fill out all forms with valid content"))
  }
  next()
}
const insertUser = (user) =>
knex('users')
.returning('*')
.insert(user)

function hashPassword(req, res, next) {
  bcrypt.hash(req.body.password, 12)
    .then(data => {
      delete req.body.password
      req.body.hashed_password = data
      next()
    })
}

function validateEmail(req, res, next) {
  checkEmail(req.body.email)
    .then(data => {
      if (data) {
        console.log(data);
        res.render('signup', {
          title: 'Create New Account',
          error: 'Email Already Exists'
        })
      } else {
        next()
      }
    })
}


const checkEmail = (email) => knex('users').where('email', email).first()
const checkUsername = (username) => knex('users').where('email', username).first()

module.exports = router;
