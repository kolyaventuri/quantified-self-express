const knexCleaner = require('knex-cleaner');
const bookshelf = require('../app/bookshelf');

class DatabaseCleaner {
  static clean() {
    return knexCleaner.clean(bookshelf.knex);
  }
}

module.exports = DatabaseCleaner;
