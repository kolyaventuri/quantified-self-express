const bookshelf = require('../bookshelf');
const validator = require('validator');

const Food = bookshelf.Model.extend({
  tableName: 'foods',

  rules: {
    name: {
      required: true,
      validator: validator.isString
    }
  }
});

module.exports = Food;
