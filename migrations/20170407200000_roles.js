
exports.up = function(knex) {
  return knex.schema.createTable('roles', (tbl) => {
    tbl.increments();
    tbl.string('role').notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('roles');
};
