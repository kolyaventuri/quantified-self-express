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

  get serialized() {
    let opts = Object.assign(this._data, {});
    let keys = Object.keys(this._serializable || {});
    return opts;
    if(keys.length < 1) return opts;

    let serialized = {};
    for(let key of keys) {
      serialized[key] = opts[key];
    }

    return serialized;
  }

  /// Record methods

  save() {
    return knex(this._tableName).insert(this._data, '*');
  }

  static all() {
    let _name = this.name.toLowerCase();
    let _tableName = pluralize(_name);

    return new Promise((resolve, reject) => {
      knex(_tableName).select('*').then((rows) => {
        let objects = rows.map(data => {
          return new this(data).serialized;
        });

        resolve(objects);
      }).catch(reject);
    });
  }
}

module.exports = Model;
