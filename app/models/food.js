const Model = require('../model');
const rules = {
  name:     { required: true },
  calories: { required: true }
};

const serializable = {
  id: true,
  name: true,
  calories: true
};

class Food extends Model {
  constructor(opts) {
    super(opts, rules);
    this._serializable = serializable;
  }
}

module.exports = Food;
