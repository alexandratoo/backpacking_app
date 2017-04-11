
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function() {
      // Inserts seed entries
      return knex('trips').insert([{
          id: 1,
          name: 'Havasu Falls',
          photo: 'https://cdn.pixabay.com/photo/2016/09/24/19/37/waterfall-1692388_960_720.jpg',
          description: 'Experience the world-renowned turquoise water and plunging falls of Havasupai!  Swim in the refreshing and idyllic pools and waterfalls that characterize Havasu Creek.  Let us take care of everything so you can absorb the magic of this amazing place!',
          start_date: "2017-04-18",
          end_date: "2017-04-22",
          cost: "1240",
          numberOfPeople: 0,
        },
        {
          id: 2,
          name: 'Grand Canyon',
          photo: 'https://cdn.pixabay.com/photo/2017/01/20/14/58/grand-canyon-1995038__340.jpg',
          description: "Spectacular vistas will await your arrival on the South Rim, where you'll hike down the famous South Kaibab Trail. Spending one night at Bright Angel Campground, we then hike to Indian Gardens.  The third day we hike out the classic Bright Angel Trail back to the South Rim. ",
          start_date: "2017-05-12",
          end_date: "2017-12-14",
          cost: "935",
          numberOfPeople: 0,
        },
        {
          id: 3,
        name: 'Sedona',
        photo: 'https://cdn.pixabay.com/photo/2016/08/16/15/19/sedona-1598194__340.jpg',
        description: "Explore the heart of Sedona's stunning Red Rock Canyon Country.  Sleep under the clearest night sky you've ever seen. Enjoy our amazing backcountry cuisine. ",
        start_date: "2017-07-15",
        end_date: "2017-07-22",
        cost: "875",
        numberOfPeople: 0,
      }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('trips_id_seq', (SELECT MAX(id) FROM trips));")
    })
};
