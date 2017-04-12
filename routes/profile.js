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



function getUser(userId) {
    return knex('users')
        .select('id', 'first_name', 'last_name', 'photo as user_photo', 'street_address', 'city', 'state', 'zipcode', 'email')
        .where('id', userId).first()

}
//
function getUserTrips(userId) {
    return knex('trips')
        .join('trips_users', 'trips.id', 'trips_users.trip_id')
        .select('trips.id as a_trip_id', 'trips.name as trip_name', 'trips.photo as trip_photo', 'description', 'start_date', 'end_date', 'cost', 'numberOfPeople')
        .where('user_id', userId)
}
//
function getBoth(userId) {
    console.log('third');
    return Promise.all([
        getUser(userId),
        getUserTrips(userId),
    ]).then(function(results) {
        let [user, trips] = results
        user.trips = trips
        return user
    })
}

router.get('/', function(req, res, next) {
    let userId = req.cookies.id
    console.log(userId);
    getBoth(userId).then((data) => {
      // console.log("user...", data);
      res.render('profile', {data})
    })
})

// router.get('/', function(req, res, next) {
//   res.render('login', {welcome: 'Welcome Back!  Login here.'});
// });

// router.get('/', function(req, res, next) {
//     let id = req.cookies.id
//     knex('users')
//         .select('id', 'first_name', 'last_name', 'photo', 'street_address', 'city', 'state', 'zipcode', 'email')
//         .where('id', id)
//         .then((userFromKnex) => {
//             knex('trips_users')
//                 .select('*')
//                 .where('user_id', id)
//                 .then((userTrips) => {
//                   console.log(userFromKnex);
//                   console.log(userTrips);
//                     res.render('profile', {
//                         user: userFromKnex,
//                         trips: userTrips
//                     });
//                 })
//         })
// });

// router.get('/', function(req, res, next) {
//             let id = req.cookies.id
//             knex('users')
//              .select('users.id as uuser_id', 'first_name', 'last_name', 'users.photo as user_photo', 'street_address', 'city', 'state', 'zipcode', 'email', 'trip_id', 'user_id', 'trips.name as trip_name', 'description', 'trips.photo as trip_photo', 'start_date', 'end_date', 'cost')
//                 .join('trips_users', 'users.id', 'trips_users.user_id')
//                 .join('trips', 'trips.id', 'trips_users.trip_id')
//                 .then((userFromKnex) => {
//                         console.log(userFromKnex)
//                           res.render('profile', {data: userFromKnex})
//                     })
//
//                 });

// getUserWithTrips(req.cookies.id)

module.exports = router;
