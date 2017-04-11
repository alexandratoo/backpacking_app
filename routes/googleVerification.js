var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ev = require('express-validation');
const validations = require('../validations/admin');
require('dotenv');

router.get('/', function(req, res, next) {
  res.render('google14bb5f30d013ce41');
});

module.exports = router;
