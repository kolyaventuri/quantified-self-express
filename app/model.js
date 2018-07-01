class Model {
  constructor(opts, rules) {
    this._rules = rules || {};
    let keys = Object.keys(opts);
    for(let key of keys) {
      this[key] = opts[key];
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
    if(this._rules[key].required === true && !this[key]) return false;

    return true;
  }

  get isValid() {
    return this._valid;
  }
}

module.exports = Model;
