var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');
require('dotenv');

router.get('/', function(req, res, next) {
    res.render('signup', {
        title: 'Create New Account'
    });
});

router.post('/', validateCreate, validateEmail, (req, res, next) => {
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
                phone: data.phone,
                street_address: data.streetAddress,
                city: data.city,
                state: data.state,
                zipcode: data.zip,
                email: data.email,
                hashed_password: data.hashed_password
            }
            insertUser(userToAdd)
                .then((data) => {
                    // console.log(data[0].id, req.body.email);
                    let token = jwt.sign({
                        id: data[0].id
                    }, process.env.JWT_SECRET)
                    res.cookie('token', token, {
                        httpOnly: true
                    })
                    // May change later. for now redirects to trips
                    // res.redirect(`users/${data[0].id}`)
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
