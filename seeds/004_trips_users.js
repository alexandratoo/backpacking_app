
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('trips_users').insert([
        {id: 1, trip_id: 1, user_id: 1, stripe_id: 'ajbjsdse', amount: '1', charge_id: 'hey'},
        {id: 2, trip_id: 2, user_id: 1, stripe_id: 'ajbjdsasdse', amount: '1', charge_id: 'hey'},
        {id: 3, trip_id: 1, user_id: 1, stripe_id: 'ajbjsdse', amount: '1', charge_id: 'hey'},
      ]);
    }).then(() => {
      return knex.raw("SELECT setval('trips_users_id_seq', (SELECT MAX(id) FROM trips_users));")
    }).then(() => {
      return knex.raw('update trips set "numberOfPeople" = ( select count(user_id) from trips_users where trips_users.trip_id = trips.id);')
    });
};
