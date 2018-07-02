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

  get foods() {
    return new Promise((resolve, reject) => {
      MealFood.where({ meal_id: this._data.id }, 'meal_foods').then(foods => {
        resolve(foods);
      }).catch(reject);
    });
  }

  add_food(food) {
    return new Promise((resolve, reject) => {
      new MealFood({ meal_id: this._data.id, food_id: food._data.id })
        .save()
        .then(() => {
          resolve();
        }).catch(reject);
    });
  }
}

module.exports = Meal;
