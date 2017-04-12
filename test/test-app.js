process.env.NODE_ENV = 'test';

const chai = require('chai')
chai.use(require('chai-http'))
const app = require('../app')
const expect = require('chai').expect
const request = require('supertest');
const knex = require('../knex');




describe('GET /trips', () => {
    it('renders an html page', done => {
        request(app)
            .get('/trips')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200, done);
    });
});

describe('POST /', () => {

    var newUser = {
        id: 4,
        first_name: 'Unicorn',
        last_name: 'McHikeaton',
        photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',

        email: "shmee@shmee.com",
        role_id: 1,

    }


    it('posts to users', done => {
        request(app)
            .post('/')
            .send(newUser)
            .expect(200, done);
    })

});

describe('PUT /', () => {

    var updatedTrip = {
        name: 'Boulder',
        picture: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
        description: 'A politically correct type of town'
    }


    it('responds with html', done => {
        request(app)
            .put('/trips')
            .type('form')
            .send(updatedTrip)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(404, done);
    });



});
//
describe('DELETE /', () => {

    it('responds with html', done => {
        request(app)
            .delete('/1')
            .send('/1')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(404, done);
    });

    it('deletes the trip in the database', done => {
        request(app)
            .delete('/trips/1')
            .send('/trips/1')
            .expect(404, done);
    });

});
//
// describe('DELETE /trips_users/1', () => {
//
//     it('responds with JSON', done => {
//         request(app)
//             .delete('/trips_users/1')
//             .send('/trips_users/1')
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
//
//     it('deletes the trip in the database', done => {
//         request(app)
//             .delete('/trips_users/1')
//             .send('/trips_users/1')
//             .expect(404, done);
//     });
// })
