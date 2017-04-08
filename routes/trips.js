var express = require('express');
var router = express.Router();
const knex = require('../knex.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            .select('id', 'name', 'photo', 'dates', 'cost', 'description')
            .then((tripsFromKnex) => {
              res.render('trips', {
                trips: tripsFromKnex
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
// router.post('/', (req, res, next) => {
//   knex('trips')
//     .insert(req.body)
//     .then(() => {
//       res.redirect('/trips')
//     })
// })
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
