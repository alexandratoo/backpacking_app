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
const stripe = require('stripe')(process.env.STRIPE_SECRET)


router.get('/', function(req, res, next) {
  if (!req.cookies.role) {
    let style = 'display:none';
    knex('trips')
      .select('id', 'name', 'photo', 'start_date', 'end_date', 'cost', 'description', 'numberOfPeople')
      .orderBy('id', 'asc')
      .then((tripsFromKnex) => {
        res.render('trips', {
          trips: tripsFromKnex,
          userId: req.cookies.id,
          hidden: style
        });
    })
  }
  else {
    let hideStyle = 'display:none';
    knex('trips')
    .select('id', 'name', 'photo', 'start_date', 'end_date', 'cost', 'description', 'numberOfPeople')
    .orderBy('id', 'asc')
    .then((tripsFromKnex) => {
      res.render('trips', {
        trips: tripsFromKnex,
        userId: req.cookies.id,
        hideStyle: hideStyle
      });
    })
  }
});


router.post('/', (req, res, next) => {
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  }).then((data) => {
    let customerId = data.id;
    return stripe.charges.create({
      amount: req.body.trip_price * 100,
      currency: "usd",
      customer: customerId
    })
  .then((charge) => {
      let chargeToAdd = {
        trip_id: req.body.trip_id,
        user_id: req.cookies.id,
        stripe_id: customerId,
        amount: (charge.amount).toString(),
        charge_id: charge.id
      }
      knex('trips_users')
      .insert(chargeToAdd)
      .returning('*')
      .then(() => {
        return knex.raw('update trips set "numberOfPeople" = ( select count(user_id) from trips_users where trips_users.trip_id = trips.id);')
        .then(res.redirect('/profile'))
      })
    })
  })
});

module.exports = router;
