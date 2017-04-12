exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([{
                    id: 1,
                    first_name: 'Kevin',
                    last_name: 'Seagraves',
                    photo: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA2PAAAAJGQyNzU1YmI2LWE3NTgtNDg2Yi05YjRhLWQzY2Q2MTQ5ZmQyMA.jpg',
                    email: "me@me.com",
                    role_id: 1
                },
                {
                    id: 2,
                    first_name: 'Tim',
                    last_name: 'Cutter',
                    photo: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAspAAAAJDViMWUxODU0LTVjYWQtNGQ3Zi1iYTA1LThiZDg0MmU0OWUxOQ.jpg',
                    email: "you@you.com",
                    role_id: 2
                },
                {
                    id: 3,
                    first_name: 'Royal',
                    last_name: 'Robbins',
                    photo: 'https://static.royalrobbins.com/media/wysiwyg/Royalropes_sepia-padding2.jpg',
                    email: "him@him.com",
                    role_id: 3
                }
            ]);
        })
        .then(() => {
            return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
        })
};
