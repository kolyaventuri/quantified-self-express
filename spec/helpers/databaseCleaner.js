const cleaner = require('knex-cleaner');
const knex = require('../../db/knex');

class DatabaseCleaner {
  static clean() {
    return knexCleaner.clean(knex);
  }
}

module.exports = DatabaseCleaner;
