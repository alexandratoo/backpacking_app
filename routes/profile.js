var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');
const ev = require('express-validation');
const validations = require('../validations/trips');
require('dotenv');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('profile', {user: 'Hello'});
// });

function getUser(userId){
  return  knex('users')
          .select('id', 'first_name', 'last_name', 'photo', 'street_address', 'city', 'state', 'zipcode', 'email')
          .where('id', userId)
}

function getUserTrips(userId) {
  knex('trips_users')
      .select('*')
      .where('user_id', userId)
}

function getTrips()

router.get('/', function(req, res, next) {
    let id = req.cookies.id
    knex('users')
        .select('id', 'first_name', 'last_name', 'photo', 'street_address', 'city', 'state', 'zipcode', 'email')
        .where('id', id)
        .then((userFromKnex) => {
            knex('trips_users')
                .select('*')
                .where('user_id', id)
                .then((userTrips) => {
                  console.log(userFromKnex);
                  console.log(userTrips);
                    res.render('profile', {
                        user: userFromKnex,
                        trips: userTrips
                    });
                })
        })
});

getUserWithTrips(req.cookies.id)

module.exports = router;
