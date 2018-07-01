const cleaner = require('knex-cleaner');
const knex = require('../../db/knex');

class DatabaseCleaner {
  static clean() {
    return cleaner.clean(knex);
  }
}

module.exports = DatabaseCleaner;
