var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var knex = require('../knex');
var jwt = require('jsonwebtoken');
const ev = require('express-validation');
const validations = require('../validations/login');
require('dotenv');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {welcome: 'Welcome Back!  Login here.'});
});

router.post('/', ev(validations.post), (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  knex('users')
    .select('*')
    .where('email', email)
    .first()
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.hashed_password, (err, result) => {
          if(result){
            console.log('user', user);
            console.log('result', result);
            res.cookie('id', user.id)

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
      }
      else {
        res.render('login', {error: 'Please enter a valid email and password, or if you are a new user, register below.'});
      }
    })
})

module.exports = router;
