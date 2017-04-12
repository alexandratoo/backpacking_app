var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var knex = require('../knex');
var jwt = require('jsonwebtoken');
require('dotenv');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', (req, res, next) => {
  if (req.body.email === 'ryanpfrazier@gmail.com') {
    req.body.role_id = 3;
  }
  else {
    req.body.role_id = 1;
  }
  knex('users')
    .select('*')
    .where('email', req.body.email)
    .then((data) => {
      if (!data[0]) {
        let user = req.body;
        knex('users')
        .returning('*')
        .insert(user)
        .then((returnedData) => {
          return setTokens(returnedData[0])
        })
        .then((role) => {
          res.cookie('session', token);
          res.cookie('role', roleToken);
          if (role === 3) {
            res.status(200).send(true)
          }
          else {
            res.status(200).send(true)
          }
        })
        .then(res.status(200).send(true))
      }
      else {
        setTokens(data[0]);
        res.cookie('session', token);
        res.cookie('role', roleToken);
        if (data[0].role_id === 3) {
          res.status(200).send(true)
        }
        else {
          res.status(200).send(true)
        }
      }
    })


  // knex('users')
  //   .select('*')
  //   .where('email', email)
  //   .first()
  //   .then((user) => {
  //     bcrypt.compare(password, user.hashed_password, (err, result) => {
  //       if(result){
  //         let token = jwt.sign({user:user}, process.env.JWT_SECRET);
  //         res.cookie('session', token);
  //
  //         if (user.role_id === 3) {
  //           let roleToken = jwt.sign({role:user.role_id}, process.env.JWT_SECRET);
  //           res.cookie('role', roleToken);
  //           res.redirect('/admin')
  //         }
  //         if (user.role_id === 2) {
  //           let roleToken = jwt.sign({role:user.role_id}, process.env.JWT_SECRET);
  //           res.cookie('role', roleToken);
  //            res.redirect('/trips' )
  //         }
  //         else {
  //           res.redirect('/trips');
  //         }
  //       }
  //       else {
  //         res.render('login', {error: 'Please anter a valid email and password'});
  //       }
  //     })
  //   })
})


// res.redirect('/admin')
// res.cookie('role', roleToken);
// res.redirect('/trips')

function setTokens(user) {
  let token = jwt.sign({user:user}, process.env.JWT_SECRET);
  let roleToken = jwt.sign({role: user.role_id}, process.env.JWT_SECRET);
  console.log(user.role_id);
  return user.role_id;
};

module.exports = router;
