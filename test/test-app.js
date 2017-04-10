process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../knex');


// describe('GET /trips', () => {
//     it('responds with JSON', done => {
//         request(app)
//             .get('/trips')
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
// });
//
//
// xdescribe('GET /trips/:id', () => {
// });
//
// xdescribe('POST /trips', () => {
// });
//
// xdescribe('PUT /trips/:id', () => {
// });
//
// xdescribe('DELETE /trips/:id', () => {
// });

suite('trips routes', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('GET /trips', (done) => {
    /* eslint-disable max-len */
    request(app)
      .get('/trips')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 1,
        name: 'Paria Canyon',
        photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
        description: 'Best trip I\'ve ever been on. Sweet Conyon.',
        dates: "4/14/17 - 4/22/17",
        cost: "$1.00",
        numberOfPeople: 0,
      },
      {
        id: 2,
        name: 'Vestal Peak',
        photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
        description: 'Totally rad mountain, yo',
        dates: "5/14/17 - 5/22/17",
        cost: "$1,000,000",
        numberOfPeople: 0,
      },
      {
        id: 3,
      name: 'Thailand',
      photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
      description: 'It\'s a foriegn country',
      dates: "7/15/17 - 8/22/17",
      cost: "$14",
      numberOfPeople: 0,
      }], done);

      /* eslint-enable max-len */
  });

  // test('GET /books/:id', (done) => {
  //   /* eslint-disable max-len */
  //   request(server)
  //     .get('/books/1')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200, {
  //       id: 1,
  //       title: 'JavaScript, The Good Parts',
  //       author: 'Douglas Crockford',
  //       genre: 'JavaScript',
  //       description: "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that's more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.",
  //       coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg',
  //       createdAt: '2016-06-26T14:26:16.000Z',
  //       updatedAt: '2016-06-26T14:26:16.000Z'
  //     }, done);
  //
  //     /* eslint-enable max-len */
  // });
  //
  // test('POST /books', (done) => {
  //   /* eslint-disable max-len */
  //   request(server)
  //     .post('/books')
  //     .set('Accept', 'application/json')
  //     .send({
  //       title: 'Think Python',
  //       author: 'Allen B. Downey',
  //       genre: 'Python',
  //       description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
  //       coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect((res) => {
  //       delete res.body.createdAt;
  //       delete res.body.updatedAt;
  //     })
  //     .expect(200, {
  //       id: 9,
  //       title: 'Think Python',
  //       author: 'Allen B. Downey',
  //       genre: 'Python',
  //       description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
  //       coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
  //     }, done);
  //
  //     /* eslint-enable max-len */
  // });
  //
  // test('PATCH /books/:id', (done) => {
  //   /* eslint-disable max-len */
  //   request(server)
  //     .patch('/books/1')
  //     .set('Accept', 'application/json')
  //     .send({
  //       title: 'Think like Python',
  //       author: 'Allen B. Downey',
  //       genre: 'Python stuff',
  //       description: 'More Python',
  //       coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect((res) => {
  //       delete res.body.createdAt;
  //       delete res.body.updatedAt;
  //     })
  //     .expect(200, {
  //       id: 1,
  //       title: 'Think like Python',
  //       author: 'Allen B. Downey',
  //       genre: 'Python stuff',
  //       description: 'More Python',
  //       coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
  //     }, done);
  //
  //     /* eslint-enable max-len */
  // });
  //
  // test('DELETE /books/:id', (done) => {
  //   /* eslint-disable max-len */
  //   request(server)
  //     .del('/books/1')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect((res) => {
  //       delete res.body.createdAt;
  //       delete res.body.updatedAt;
  //     })
  //     .expect(200, {
  //       title: 'JavaScript, The Good Parts',
  //       author: 'Douglas Crockford',
  //       genre: 'JavaScript',
  //       description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that\'s more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.',
  //       coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg'
  //     }, done);
  //
  //     /* eslint-enable max-len */
  // });
});
