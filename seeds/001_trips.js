
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function() {
      // Inserts seed entries
      return knex('trips').insert([{
          id: 1,
          name: 'Paria Canyon',
          photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
          description: 'Best trip I\'ve ever been on. Sweet Conyon.',
          dates: "4/14/17 - 4/22/17",
          cost: "1",
          numberOfPeople: 0,
        },
        {
          id: 2,
          name: 'Vestal Peak',
          photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
          description: 'Totally rad mountain, yo',
          dates: "5/14/17 - 5/22/17",
          cost: "80000",
          numberOfPeople: 0,
        },
        {
          id: 3,
        name: 'Thailand',
        photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
        description: 'It\'s a foriegn country',
        dates: "7/15/17 - 8/22/17",
        cost: "14",
        numberOfPeople: 0,
      }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('trips_id_seq', (SELECT MAX(id) FROM trips));")
    })
};
