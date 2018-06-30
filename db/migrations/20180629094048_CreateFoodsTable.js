exports.up = function(knex, Promise) {
  return knex.schema.createTable('foods', (table) => {
    table.increments();
    table.string('name');
    table.integer('calories');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('foods');
};
