const Model = require('../model');
const rules = {
  name:     { required: true },
  calories: { required: true }
};

class Food extends Model {
  constructor(opts) {
    super(opts, rules);
  }
}

module.exports = Food;
