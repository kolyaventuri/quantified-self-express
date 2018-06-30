exports.up = function(knex, Promise) {
  return knex.schema.createTable('meal_foods', (table) => {
    table.integer('food_id');
    table.integer('meal_id');
    table.foreign('food_id').references('id').inTable('foods');
    table.foreign('meal_id').references('id').inTable('meals');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meal_foods');
};
