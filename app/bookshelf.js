const environment = process.env.NODE_ENV || 'development';
const dbConfig = require('../knexfile')[environment];
const knex = require('knex')(dbConfig);

module.exports = require('bookshelf')(knex);
