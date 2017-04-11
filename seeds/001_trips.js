
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function() {
      // Inserts seed entries
      return knex('trips').insert([{
          id: 1,
          name: 'Paria Canyon',
          photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
          description: 'Best trip I\'ve ever been on. Sweet Canyon.',
          start_date: "2017-04-18",
          end_date: "2017-04-22",
          cost: "1",
          numberOfPeople: 0,
        },
        {
          id: 2,
          name: 'Vestal Peak',
          photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
          description: 'Totally rad mountain, yo',
          start_date: "2017-05-12",
          end_date: "2017-12-14",
          cost: "80000",
          numberOfPeople: 0,
        },
        {
          id: 3,
        name: 'Thailand',
        photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
        description: 'It\'s a foreign country dude',
        start_date: "2017-07-15",
        end_date: "2017-07-22",
        cost: "14",
        numberOfPeople: 0,
      }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('trips_id_seq', (SELECT MAX(id) FROM trips));")
    })
};
