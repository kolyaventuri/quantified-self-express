const knex = require('../../db/knex');

class DatabaseCleaner {
  static clean() {
    return knex.raw('TRUNCATE TABLE foods,meals,meal_foods RESTART IDENTITY')
  }
}

module.exports = DatabaseCleaner;
