
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('trips_users').insert([
        {id: 1, trip_id: 1, user_id: 1, stripe_id: 'ajbjsdse'},
        {id: 2, trip_id: 2, user_id: 1, stripe_id: 'ajbjsdse'},
        {id: 3, trip_id: 3, user_id: 1, stripe_id: 'ajbjsdse'},
      ]);
    }).then(() => {
      return knex.raw("SELECT setval('trips_users_id_seq', (SELECT MAX(id) FROM trips_users));")
    });
};
