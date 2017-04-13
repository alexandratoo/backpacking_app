
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('trips_users').insert([
        {id: 1, trip_id: 1, user_id: 1, stripe_id: 'ajbjsdse', amount: '32400', charge_id: 'hey'},
        {id: 2, trip_id: 2, user_id: 1, stripe_id: 'ajbjdsasdse', amount: '93500', charge_id: 'hey'},
        {id: 3, trip_id: 5, user_id: 1, stripe_id: 'ajbjsdse', amount: '186000', charge_id: 'hey'},
        {id: 4, trip_id: 1, user_id: 2, stripe_id: 'ajbjsdse', amount: '32400', charge_id: 'hey'},
        {id: 5, trip_id: 2, user_id: 3, stripe_id: 'ajbjdsasdse', amount: '93500', charge_id: 'hey'},
        {id: 6, trip_id: 5, user_id: 4, stripe_id: 'ajbjsdse', amount: '186000', charge_id: 'hey'},
        {id: 7, trip_id: 1, user_id: 4, stripe_id: 'ajbjsdse', amount: '32400', charge_id: 'hey'},
        {id: 8, trip_id: 2, user_id: 5, stripe_id: 'ajbjdsasdse', amount: '93500', charge_id: 'hey'},
        {id: 9, trip_id: 5, user_id: 6, stripe_id: 'ajbjsdse', amount: '86600', charge_id: 'hey'},
        {id: 10, trip_id: 4, user_id: 3, stripe_id: 'ajbjsdse', amount: '44500', charge_id: 'hey'},
        {id: 11, trip_id: 4, user_id: 4, stripe_id: 'ajbjsdse', amount: '44500', charge_id: 'hey'},
        {id: 12, trip_id: 4, user_id: 5, stripe_id: 'ajbjdsasdse', amount: '44500', charge_id: 'hey'},
        {id: 13, trip_id: 4, user_id: 6, stripe_id: 'ajbjsdse', amount: '44500', charge_id: 'hey'}
      ]);
    }).then(() => {
      return knex.raw("SELECT setval('trips_users_id_seq', (SELECT MAX(id) FROM trips_users));")
    }).then(() => {
      return knex.raw('update trips set "numberOfPeople" = ( select count(user_id) from trips_users where trips_users.trip_id = trips.id);')
    });
};
