exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('trips').del()
        .then(function() {
            // Inserts seed entries
            return knex('trips').insert([{
                    id: 1,
                    name: 'Havasu Falls',
                    photo: 'https://cdn.pixabay.com/photo/2014/06/03/06/14/lake-360995__340.jpg',
                    description: 'Experience the world-renowned turquoise water and plunging falls of Havasupai!  Swim in the refreshing and idyllic pools and waterfalls that characterize Havasu Creek.  Let us take care of everything so you can absorb the magic of this amazing place!',
                    start_date: "2017-04-18",
                    end_date: "2017-04-22",
                    cost: "324",
                    numberOfPeople: 0,
                },
                {
                    id: 2,
                    name: 'Grand Canyon',
                    photo: 'https://cdn.pixabay.com/photo/2017/01/20/14/58/grand-canyon-1995038__340.jpg',
                    description: "Spectacular vistas will await your arrival on the South Rim, where you'll hike down the famous South Kaibab Trail. Spending one night at Bright Angel Campground, we then hike to Indian Gardens.  The third day we hike out the classic Bright Angel Trail back to the South Rim. ",
                    start_date: "2017-11-12",
                    end_date: "2017-12-01",
                    cost: "935",
                    numberOfPeople: 0,
                },
                {
                    id: 3,
                    name: 'Sedona',
                    photo: 'https://s-media-cache-ak0.pinimg.com/736x/7c/0f/0c/7c0f0c2bdb16d759541d2d61fe2cdac8.jpg',
                    description: "Explore the heart of Sedona's stunning Red Rock Canyon Country.  Sleep under the clearest night sky you've ever seen. Enjoy our amazing backcountry cuisine. ",
                    start_date: "2017-05-03",
                    end_date: "2017-05-12",
                    cost: "875",
                    numberOfPeople: 0,
                },
                {
                    id: 4,
                    name: 'Mount Ranier',
                    photo: 'https://cdn.pixabay.com/photo/2013/02/11/10/54/mount-ranier-80477__340.jpg',
                    description: "This hike begins in the famous Paradise Meadows of Mt. Rainier, a subalpine wonderland of flowers and fragile meadows.  A full day - and a lot of elevation - takes us to Camp Muir, the basecamp for mountaineers aiming to summit Rainier, at over 10,000 feet. If the weather cooperates, we could get views of Mt. Hood, Mt. St. Helens, and Mt. Adams",
                    start_date: "2017-10-15",
                    end_date: "2017-10-31",
                    cost: "445",
                    numberOfPeople: 0,
                },
                {
                    id: 5,
                    name: 'Machu Picchu',
                    photo: 'https://cdn.pixabay.com/photo/2012/04/26/22/48/machu-picchu-43387__340.jpg',
                    description: 'Peru is home to the most famous archeological site in South America, and one of the most famous in the world: Machu Picchu. A deeply fascinating, mysterious, ancient city that mesmerizes nearly all its visitors, "The Lost City of the Incas" is a place every avid traveler must visit. ',
                    start_date: "2017-08-15",
                    end_date: "2017-08-22",
                    cost: "1860",
                    numberOfPeople: 0,
                },
                {
                    id: 6,
                    name: 'Kilimanjaro Trek',
                    photo: 'https://cdn.pixabay.com/photo/2014/05/12/18/17/kilimanjaro-342696__340.jpg',
                    description: 'Kilimanjaro!!! Join us for an unforgettable hiking adventure on Mount Kilimanjaro! Known as "the Roof of Africa" and towering over its surrounding valleys at an astounding elevation of 19,340 feet, Kilimanjaro is one of the "7 Summits" of the world!',
                    start_date: "2017-07-15",
                    end_date: "2017-07-22",
                    cost: "2290",
                    numberOfPeople: 0,
                },
                {
                  id: 7,
                  name: 'Turin',
                  photo: 'https://farm3.staticflickr.com/2853/32736018454_5c3640c512_k.jpg',
                  description: "Follow us to one of the great unsung cities of Italy. We'll spend five days in the beautiful, northwestern city before heading north to the Alps where we'll stop in both France and Switzerland for two more weeks. This will be the trip of a lifetime.",
                  start_date: "2017-06-22",
                  end_date: "2017-07-13",
                  cost: "2399",
                  numberOfPeople: 0,
                }
            ]);
        })
        .then(() => {
            return knex.raw("SELECT setval('trips_id_seq', (SELECT MAX(id) FROM trips));")
        })
};
