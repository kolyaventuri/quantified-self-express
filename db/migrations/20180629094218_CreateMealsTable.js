exports.up = function(knex, Promise) {
  return knex.schema.createTable('meals', (table) => {
    table.increments();
    table.string('name');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meals');
};
