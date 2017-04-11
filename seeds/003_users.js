exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([{
                    id: 1,
                    first_name: 'Kevin',
                    last_name: 'Seagraves',
                    photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
                    phone: '555-555-5555',
                    street_address: "WV Van",
                    city: "Denver",
                    state: "Colorado",
                    zipcode: "80302",
                    email: "me@me.com",
                    role_id: 1,
                    hashed_password: '$2a$10$tmIQk84JLSW.ZBZNx47p2ORUYz3PNXjIgAqL0ghwCu1kcVw.21v.O'
                },
                {
                    id: 2,
                    first_name: 'Tim',
                    last_name: 'Cutter',
                    photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
                    phone: '555-555-5555',
                    street_address: "Hammock",
                    city: "Boulder",
                    state: "Colorado",
                    zipcode: "80208",
                    email: "you@you.com",
                    role_id: 2,
                    hashed_password: '$2a$10$3UZpT8re4h9.a/gVuNF2qOYa2WC/5g6IWKOc5CrgTmDRk1Xy0m77a'
                },
                {
                    id: 3,
                    first_name: 'Royal',
                    last_name: 'Robbins',
                    photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
                    phone: '555-555-5555',
                    street_address: "High up on the wall",
                    city: "Los Angeles",
                    state: "California",
                    zipcode: "12345",
                    email: "him@him.com",
                    role_id: 3,
                    hashed_password: '$2a$10$BXC5ZCQ7iBgb.HcdwXihbeMfRFtBOoOS7xbJeMoPuAUycCV260HCO'
                },
                {
                    id: 4,
                    first_name: 'Ryan',
                    last_name: 'Frazier',
                    photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
                    phone: '317-225-8384',
                    street_address: "2225 Walnut Street",
                    city: "Boulder",
                    state: "Colorado",
                    zipcode: "80302",
                    email: "ryanpfrazier@gmail.com",
                    role_id: 3,
                    hashed_password: '$2a$12$YKuFFU40Mg1oUU4AjtNvf.Y6qjM.y5/yt.SOD0E2RdlX5l9mUSZwW'
                }
            ]);
        })
        .then(() => {
            return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
        })
};
