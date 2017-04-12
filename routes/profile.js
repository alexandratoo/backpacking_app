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

function getUser(userId) {
    return knex('users')
        .select('id', 'first_name', 'last_name', 'photo as user_photo', 'email')
        .where('id', userId).first()

}

function getUserTrips(userId) {
    return knex('trips')
        .join('trips_users', 'trips.id', 'trips_users.trip_id')
        .select('trips.id as a_trip_id', 'trips.name as trip_name', 'trips.photo as trip_photo', 'description', 'start_date', 'end_date', 'cost', 'numberOfPeople')
        .where('user_id', userId)
}

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
      res.render('profile', {data})
    })
})

module.exports = router;
