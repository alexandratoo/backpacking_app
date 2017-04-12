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
  if (req.body.email === 'ryanpfrazier@gmail.com' || req.body.email === 'k.s.seagraves@gmail.com' || req.body.email === 'tjcutt@gmail.com' || req.body.email === 'sandratooley89@gmail.com') {
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
          res.cookie('session', role[1]);
          res.cookie('role', role[2]);
          if (role[0] === 3) {
            res.status(200).send(true)
          }
          else {
            res.status(200).send(true)
          }
        })
        .then(res.status(200).send(true))
      }
      else {
        setTokens(data[0])
        let returnArray = setTokens(data[0])
          res.cookie('session', returnArray[1]);
          res.cookie('role', returnArray[2]);
          if (returnArray[0].role_id === 3) {
            res.status(200).send(true)
          }
          else {
            res.status(200).send(true)
          }
      }
    })
})

function setTokens(user) {
  let token = jwt.sign({user:user}, process.env.JWT_SECRET);
  let roleToken = jwt.sign({role: user.role_id}, process.env.JWT_SECRET);
  return [user.role_id, token, roleToken];
};

module.exports = router;
