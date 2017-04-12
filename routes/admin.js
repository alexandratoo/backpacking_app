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
      res.redirect('/trips')
    }
    else {
    knex('trips')
      .select('id', 'name', 'photo', 'start_date', 'end_date', 'cost', 'description', 'numberOfPeople')
      .orderBy('id', 'asc')
      .then((tripsFromKnex) => {
        console.log('here before render');
        res.render('admin', {
          trips: tripsFromKnex
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
    .returning('*')
    .insert(req.body)
    .then((data) => {
      console.log(data);
    })
    .then(
      res.render('admin')
    );
});

router.put('/', function(req, res, next) {
  knex('trips')
    .where('id', req.body.id)
    .returning('*')
    .update(req.body)
  .then((data) => {
    res.status(200).send(true)
  })
})

router.delete('/', function(req, res, next) {
  knex('trips')
    .where('id', req.body.id)
    .del()
    .then(
      res.status(200).send(true)
    )
});

module.exports = router;
