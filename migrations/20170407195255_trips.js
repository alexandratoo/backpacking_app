

exports.up = function(knex) {
  return knex.schema.createTable('trips', (tbl) => {
    tbl.increments();
    tbl.string('name').notNullable()
    tbl.string('photo').notNullable().defaultTo('https://s-media-cache-ak0.pinimg.com/originals/02/8c/43/028c43ed3eeab6c4a43181f517810501.jpg');
    tbl.text('description').notNullable();
    tbl.text('dates').notNullable();
    tbl.text('cost').notNullable();
    tbl.integer('numberOfPeople').defaultTo(0)
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('trips');
};
