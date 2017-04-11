var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');
require('dotenv');
const stripe = require('stripe')(process.env.STRIPE_SECRET)

/* GET home page. */
router.get('/', function(req, res, next) {
  // if (req.query.idToGet) {
  //   let query = req.query.idToGet;
  //   res.redirect(`/trips/${query}`)
  // }
  // if(req.cookies.session){
  //   let decoded = jwt.verify(req.cookies.session, 'EGGS');
  //   let user = decoded.user;
  //   console.log(user.username);
          knex('trips')
            .select('id', 'name', 'photo', 'dates', 'cost', 'description', 'numberOfPeople')
            .then((tripsFromKnex) => {
              res.render('trips', {
                trips: tripsFromKnex,
                userId: req.cookies.id
              });
          })
  //           })
  //       } else {
  //         res.redirect('/');
  //       }
  //     })
  // } else {
  //   res.redirect('/');
  // }

});
//
// router.get('/:id', (req, res, next) => {
//   let id = req.params.id
//   knex('trips')
//     .where('id', id)
//     .then((selectedTrip) => {
//       res.render('index', {
//         trips: selectedTrip
//       });
//     })
// })
//
router.post('/', (req, res, next) => {

  console.log(req.body);
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
      .then(function(data){
        console.log(data)
      res.end()})
    })
    // .then((theCharge) => {
    //   console.log(theCharge);
    //
    // }).then(function(data){
    //   console.log(data)
    // res.end()})
  })
  // res.end();
  // knex('trips_users')
  //   .insert(req.body)
  //   .then(() => {
      // res.redirect('/trips')
    // })
});
//
// router.put('/', (req, res, next) => {
//   let newInfo = req.body;
//   let id = req.body.id;
//   knex('trips')
//     .where('id', id)
//     .first()
//     .update({name: newInfo.name, picture: newInfo.picture, description: newInfo.description})
//     .then(() => {
//       res.status(200).send(true);
//     })
// })
//
// router.delete('/', (req, res, next) => {
//   let id = req.body.id;
//   knex('trips')
//     .where('id', id)
//     .first()
//     .del()
//     .then(() => {
//       res.status(200).send(true);
//     })
// })

module.exports = router;
