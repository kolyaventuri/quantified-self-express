const Model = require('../model');
const MealFood = require('./mealFood');
const Food = require('./food');

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
      MealFood.where({ meal_id: this._data.id }, 'meal_foods').then(mealFoods => {
        let promises = mealFoods.map(mealFood => {
          return Food.find(mealFood._data.food_id);
        });

        Promise.all(promises)
          .then(foods => {
            resolve(foods);
          }).catch(reject);
      }).catch(reject);
    });
  }

  addFood(food) {
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
