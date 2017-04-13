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
        console.log(tripIds);
        return Promise.all(tripIds.map((id, index) => {
          return knex.raw(`select users.*, trips_users.trip_id from trips_users join users on trips_users.user_id = users.id where trips_users.trip_id = ${id};`)
          .then((thisTrip) => {
            thisTrip.trip = trips[index];
            return thisTrip;
          })
        }))
        // let users = []
        // for (let i = 1; i < tripsFromKnex.length + 1; i++) {
        //   users[i] = '';
        //   knex.raw(`select users.*, trips_users.trip_id from trips_users join users on trips_users.user_id = users.id where trips_users.trip_id = ${i};`)
        //   .then((data) => {
        //     // console.log(data);
        //     users.push(data.rows)
        //     console.log('users', users);
        //   })
        // }
        // knex.raw('select users.*, trips_users.trip_id from trips_users join users on trips_users.user_id = users.id where trips_users.trip_id = 3;')
        // return [trips, users]
      })
      .then((data) => {
        console.log(data[0].rows);
        // let tripData = [];
        // let userData = [];
        // data.forEach(el => {
        //   tripData.push(el.trip)
        //   userData.push(el.rows)
        // })
        res.render('admin', {
          trips: data
          // tUsers1: userData[0],
          // tUsers2: userData[1],
          // tUsers3: userData[2],
          // tUsers4: userData[3],
          // tUsers5: userData[4],
          // tUsers6: userData[5]
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
  knex('trips')
    .returning('*')
    .insert(req.body)
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
