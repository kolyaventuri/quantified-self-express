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

  update(data) {
    return new Promise((resolve, reject) => {
      knex(this._tableName)
        .where({ id: this._data.id })
        .update(data)
        .returning('*')
        .then(rows  => {
          let row = rows[0];
          resolve(new this.constructor(row));
        })
        .catch(reject);
    });
  }

  destroy() {
    return new Promise((resolve, reject) => {
      knex(this._tableName)
        .where(this._data)
        .delete()
        .then(resolve)
        .catch(reject);
    });
  }

  static all() {
    let _name = this.name.toLowerCase();
    let _tableName = pluralize(_name);

    return new Promise((resolve, reject) => {
      knex(_tableName).select('*').orderBy('id', 'ASC').then((rows) => {
        let objects = rows.map(data => {
          return new this(data);
        });

        resolve(objects);
      }).catch(reject);
    });
  }

  static find(id) {
    let _name = this.name.toLowerCase();
    let _tableName = pluralize(_name);

    return new Promise((resolve, reject) => {
      knex(_tableName).where({ id }).then((rows) => {
        let row = rows[0];
        if(!row) return resolve(false);
        resolve(new this(row));
      }).catch(reject);
    });
  }

  static where(opts, _tableName) {
    let _name = this.name.toLowerCase();
    _tableName = _tableName || pluralize(_name);

    return new Promise((resolve, reject) => {
      knex(_tableName).where(opts).then(rows => {
        let objects = rows.map(row => {
          return new this(row);
        });

        resolve(objects);
      }).catch(reject);
    });
  }
}

module.exports = Model;
