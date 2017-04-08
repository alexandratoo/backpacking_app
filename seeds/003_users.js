exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([{
                    id: 1,
                    name: 'Kevin Seagraves',
                    photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
                    phone: '555-555-5555',
                    address: "WV Van",
                    email: "me@me.com",
                    role_id: 1
                },
                {
                    id: 2,
                    name: 'Tim Cutter',
                    photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
                    phone: '555-555-5555',
                    address: "Hammock",
                    email: "you@you.com",
                    role_id: 2
                },
                {
                    id: 3,
                    name: 'Royal Robbins',
                    photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
                    phone: '555-555-5555',
                    address: "High up on the wall",
                    email: "him@him.com",
                    role_id: 3
                },
            ]);
        })
        .then(() => {
            return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
        })
};
