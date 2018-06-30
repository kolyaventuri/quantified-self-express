const environment = process.env.NODE_ENV || 'development';
const dbConfig = require('../knexfile')[environment];
const knex = require('knex')(dbConfig);

const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('bookshelf-validation');

module.exports = bookshelf;
