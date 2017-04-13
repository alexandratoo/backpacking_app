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
      knex('trips')
      .select('id', 'name', 'photo', 'start_date', 'end_date', 'cost', 'description', 'numberOfPeople')
      .orderBy('id', 'asc')
      .then((tripsFromKnex) => {
        let trips = tripsFromKnex;
        let tripIds = tripsFromKnex.map(el => el.id);
        return Promise.all(tripIds.map((id, index) => {
          return knex.raw(`select users.*, trips_users.trip_id from trips_users join users on trips_users.user_id = users.id where trips_users.trip_id = ${id} order by users.id asc;`)
          .then((thisTrip) => {
            thisTrip.trip = trips[index];
            return thisTrip;
          })
        }))
      })
      .then((data) => {
        let newTrip = data.length;
        res.render('admin', {
          trips: data,
          newTrip: newTrip
        })
      })
    }
    
    // else if (role === 2) {
    //
    // }
    else {
      res.redirect('/trips')
    }
  }
  else {
    res.redirect('/')
  }
});

router.post('/', function(req, res, next) {
  delete req.body.id
  knex('trips')
    .returning('*')
    .insert(req.body)
    .then(
      res.redirect('admin')
    );
});

router.put('/', function(req, res, next) {
  console.log('updating', req.body);
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
