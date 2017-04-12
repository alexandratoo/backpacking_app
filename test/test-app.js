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
            .expect('Content-Type', 'html')
            .expect(200, done);
    });
});
//
// describe('GET /users', () => {
//     it('returns user information in json', done => {
//         request(app)
//             .get('/users')
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
// });

describe('GET /users/1', () => {
    it('returns an array of the user at specified id when responding with JSON', done => {
        request(app)
            .get('/users')
            .end((err, res) => {
                expect(res.body).to.deep.equal([{
                    id: 1,
                    first_name: 'Kevin',
                    last_name: 'Seagraves',
                    photo: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA2PAAAAJGQyNzU1YmI2LWE3NTgtNDg2Yi05YjRhLWQzY2Q2MTQ5ZmQyMA.jpg',
                    email: "me@me.com",
                    role_id: 1

                }]);
                done();
            });
    });
});
// 
//
// describe('POST /trips', () => {
//
//     var newTrip = {
//         id: 4,
//         name: 'Gand Canyon',
//         photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
//         description: 'Really big hole in the ground',
//         dates: "9/14/27 - 4/22/37",
//         cost: "$100.00",
//         numberOfPeople: 0
//     }
//
//     it('responds with JSON', done => {
//         request(app)
//             .post('/trips')
//             .type('form')
//             .send(newTrip)
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
//
//     it('posts to trips', done => {
//         request(app)
//             .post('/trips')
//             .send(newTrip)
//             .expect(302, done)
//     })
//
// });
//
// describe('POST /trips_users', () => {
//
//     var newSignUp = {
//         id: 4,
//         trip_id: 3,
//         user_id: 2,
//         stripe_id: 'New Stripe ID'
//     }
//
//
//     it('responds with JSON', done => {
//         request(app)
//             .post('/trips_users')
//             .type('form')
//             .send(newSignUp)
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
//
//     it('posts to trips_users', done => {
//         request(app)
//             .post('/trips_users')
//             .send(newSignUp)
//             .expect(302, done);
//     })
//
// });
//
// describe('POST /users', () => {
//
//     var newUser = {
//         id: 4,
//         first_name: 'Unicorn',
//         last_name: 'McHikeaton',
//         photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
//
//         email: "shmee@shmee.com",
//         role_id: 1,
//
//     }
//
//
//     it('responds with JSON', done => {
//         request(app)
//             .post('/users')
//             .type('form')
//             .send(newUser)
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
//
//     it('posts to users', done => {
//         request(app)
//             .post('/users')
//             .send(newUser)
//             .expect(302, done);
//     })
//
// });
//
// describe('PUT /trips/:id', () => {
//
//     var updatedTrip = {
//         name: 'Gand Canyon',
//         photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
//         dates: "9/14/27 - 4/22/37",
//         cost: "$100.00"
//     }
//
//
//     it('responds with JSON', done => {
//         request(app)
//             .put('/trips/1')
//             .type('form')
//             .send(updatedTrip)
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
//
//     it('updates the trip in the database', done => {
//         request(app)
//             .put('/trips/1')
//             .type('form')
//             .send(updatedTrip)
//             .end((err, res) => {
//                 knex('trips').where('id', 1).first().then(trip => {
//                     expect(trip.name).to.equal(updatedTrip.trip.name);
//                     expect(trip.age).to.equal(updatedTrip.trip.age);
//                     expect(trip.image).to.equal(updatedTrip.trip.image);
//                     done();
//                 });
//             });
//     });
//
// });
//
// describe('DELETE /trips/:id', () => {
//
//     it('responds with JSON', done => {
//         request(app)
//             .delete('/trips/1')
//             .send('/trips/1')
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
//
//     it('deletes the trip in the database', done => {
//         request(app)
//             .delete('/trips/1')
//             .send('/trips/1')
//             .expect(404, done);
//     });
//
// });
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
