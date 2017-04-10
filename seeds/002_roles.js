
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {id: 1, role: 'participant'},
        {id: 2, role: 'leader'},
        {id: 3, role: 'admin'}
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles));")
    });
};
