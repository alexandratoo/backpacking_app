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
  let email = req.body.email;
  let password = req.body.password;
  knex('users')
    .select('*')
    .where('email', email)
    .first()
    .then((user) => {
      bcrypt.compare(password, user.hashed_password, (err, result) => {
        if(result){
          let token = jwt.sign({user:user}, process.env.JWT_SECRET);
          res.cookie('session', token);

          if (user.role_id === 3) {
            let roleToken = jwt.sign({role:user.role_id}, process.env.JWT_SECRET);
            res.cookie('role', roleToken);
            res.redirect('/admin')
          }
          else {
            res.redirect('/trips');
          }
        }
        else {
          res.render('login', {error: 'Please anter a valid email and password'});
        }
      })
    })
})

module.exports = router;
