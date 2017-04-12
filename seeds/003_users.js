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
                    email: "me@me.com",
                    role_id: 1
                },
                {
                    id: 2,
                    first_name: 'Tim',
                    last_name: 'Cutter',
                    photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
                    email: "you@you.com",
                    role_id: 2
                },
                {
                    id: 3,
                    first_name: 'Royal',
                    last_name: 'Robbins',
                    photo: 'http://cdn.danspapers.com/wp-content/uploads/2013/10/BurritoMeme.jpg',
                    email: "him@him.com",
                    role_id: 3
                }
            ]);
        })
        .then(() => {
            return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
        })
};
