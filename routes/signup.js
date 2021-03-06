var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');
const ev = require('express-validation');
const validations = require('../validations/signup');
require('dotenv');

router.get('/', function(req, res, next) {
    res.render('signup', {
        title: 'Create A New Account'
    });
});

router.post('/', validateCreate, validateEmail, ev(validations.post), (req, res, next) => {
    bcrypt.hash(req.body.password, 12)
        .then((data) => {
            delete req.body.password
            req.body.hashed_password = data
            return req.body
        }).then((data) => {
            let userToAdd = {
                first_name: data.firstName,
                last_name: data.lastName,
                photo: data.photo,
                email: data.email,
                role_id: 1
            }
            insertUser(userToAdd)
                .then((data) => {
                    let token = jwt.sign({
                        id: data[0].id
                    }, process.env.JWT_SECRET)
                    res.cookie('token', token, {
                        httpOnly: true
                    })
                    res.cookie('id', data[0].id)
                    res.redirect('trips')
                })
        })
        .catch(err => {
            console.log('error error error', err);
            res.end()
        })
})

function validateCreate(req, res, next) {
    if (!req.body.password || !req.body.email || !req.body.firstName || !req.body.lastName) {
        next(boom.create(400, "Please fill out all forms with valid content"))
    } else {
        next()
    }
}
const insertUser = (user) =>
    knex('users')
    .returning('*')
    .insert(user)

function hashPassword(req, res, next) {
    bcrypt.hash(req.body.password, 12)
        .then(data => {
            delete req.body.password
            req.body.hashed_password = data
            next()
        })
}

function validateEmail(req, res, next) {
    checkEmail(req.body.email)
        .then(data => {
            if (data) {
                res.render('signup', {
                    title: 'Create New Account',
                    error: 'Email Already Exists'
                })
            } else {
                next()
            }
        })
}


const checkEmail = (email) => knex('users').where('email', email).first()
const checkUsername = (username) => knex('users').where('email', username).first()

module.exports = router;
