const pluralize = require('pluralize');
const knex = require('../db/knex');

class Model {
  constructor(opts, rules) {
    this._name = this.constructor.name.toLowerCase();
    this._tableName = pluralize(this._name);

    this._rules = rules || {};
    let keys = Object.keys(opts);
    this._data = {};

    for(let key of keys) {
      this._data[key] = opts[key];
    }

    this._valid = true;
    this._validate();
  }

  _validate() {
    let keys = Object.keys(this._rules);
    for(let key of keys) {
      if(!this._checkValid(key)) {
        this._valid = false;
        return;
      }
    }
  }

  _checkValid(key) {
    if(!this._rules[key]) return true;
    if(this._rules[key].required === true && !this._data[key]) return false;

    return true;
  }

  get isValid() {
    return this._valid;
  }

  /// Record methods

  save() {
    return knex(this._tableName).insert(this._data, ['id', 'name', 'calories']);
  }
}

module.exports = Model;
