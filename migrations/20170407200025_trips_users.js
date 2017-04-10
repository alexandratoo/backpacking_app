exports.up = function(knex) {
  return knex.schema.createTable('trips_users', (tbl) => {
    tbl.increments();
    tbl.integer('trip_id').references('trips.id').onDelete('CASCADE')
    tbl.integer('user_id').references('users.id').onDelete('CASCADE')
    tbl.string('stripe_id').notNullable()
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('trips_users');
};
