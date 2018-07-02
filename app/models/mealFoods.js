const Model = require('../model');

class MealFood extends Model {
  constructor(opts) {
    super(opts);
    this._tableName = 'meal_foods';
  }
}

module.exports = MealFood;
