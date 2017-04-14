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
  if (req.cookies.role) {
    let role = jwt.verify(req.cookies.role, process.env.JWT_SECRET).role;
    if (role === 3) {

    }
  }
});
