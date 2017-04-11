var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var knex = require('../knex');
var jwt = require('jsonwebtoken');
require('dotenv');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log(bcrypt.hashSync('password1', 10));
  // console.log(bcrypt.hashSync('password2', 10));
  // console.log(bcrypt.hashSync('password3', 10));
  res.render('login');
});

router.post('/', (req, res, next) => {
  console.log(req.body, 'from login post');
  let email = req.body.email;
  let password = req.body.password;
  knex('users')
    .select('*')
    .where('email', email)
    .first()
    .then((user) => {
      console.log('user', user);
      bcrypt.compare(password, user.hashed_password, (err, result) => {
        if(result){
          let token = jwt.sign({user:user}, process.env.JWT_SECRET);
          res.cookie('session', token);

          if (user.role_id === 3) {
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
      // res.render('login')
    })
})

module.exports = router;
