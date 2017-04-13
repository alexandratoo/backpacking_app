var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var knex = require('../knex');
var jwt = require('jsonwebtoken');
require('dotenv');

router.get('/', function(req, res, next) {
  res.clearCookie('id');
  res.clearCookie('role');
  res.clearCookie('session');
  res.redirect('/');
});

module.exports = router;
