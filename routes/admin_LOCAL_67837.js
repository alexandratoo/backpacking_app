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
    if (role !== 3) {
      res.redirect('/')
    }
    else {
    knex('trips')
      .select('id', 'name', 'photo', 'start_date', 'end_date', 'cost', 'description', 'numberOfPeople')
      .then((tripsFromKnex) => {
        res.render('admin', {
          trips: tripsFromKnex,
          userId: req.cookies.id
        });
      })
    }
  }
  else {
    res.redirect('/')
  }
});

router.post('/', function(req, res, next) {
  knex('trips')
    .where('id', req.body.id)
    .returning('*')
    .update(req.body)
  .then((data) => {
    console.log(data);
  }).then(
    res.redirect('admin')
  );
})

// router.post('/', function(req, res, next) {
//   knex('trips')
//     .where('id', req.body.id)
//     .returning('*')
//     .update(req.body)
//   .then((data) => {
//     console.log(data);
//   }).then(
//     res.redirect('admin')
//   );
// })


module.exports = router;
