exports.up = function(knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments();
    tbl.string('first_name').notNullable();
    tbl.string('last_name').notNullable();
    tbl.string('photo').notNullable().defaultTo('https://s-media-cache-ak0.pinimg.com/originals/02/8c/43/028c43ed3eeab6c4a43181f517810501.jpg');
    tbl.text('phone').notNullable();
    tbl.text('address').notNullable();
    tbl.text('email').notNullable();
    tbl.string('hashed_password').notNullable();
    tbl.integer('role_id').references('roles.id').onDelete("CASCADE");
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
