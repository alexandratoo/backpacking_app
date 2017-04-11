var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv');

router.get('/', function(req, res, next) {
  knex('trips')
    .select('id', 'name', 'photo', 'start_date', 'end_date', 'cost', 'description', 'numberOfPeople')
    .then((tripsFromKnex) => {
      res.render('admin', {
        trips: tripsFromKnex,
        userId: req.cookies.id
      });
  })
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.redirect('admin');
})

module.exports = router;
