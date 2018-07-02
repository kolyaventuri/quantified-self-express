const Model = require('../model');
const rules = {
  name:     { required: true }
};

const serializable = {
  id: true,
  name: true
};

class Meal extends Model {
  constructor(opts) {
    super(opts, rules);
    this._serializable = serializable;
  }
}

module.exports = Meal;
