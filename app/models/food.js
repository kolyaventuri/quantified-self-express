const Model = require('../model');
const db = require('../../db/knex');

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

  static async favorites() {
    let template = {
      timesEaten: 0,
      foods: []
    };

    return new Promise((resolve, reject) => {

      db('meal_foods')
        .distinct('food_id')
        .groupBy('meal_foods.food_id')
        .count('food_id')
        .then(async data => {
          let max = Math.max(...(data.map(mf => mf.count)));
          let foods = data.filter(mf => mf.count == max);

          foods = await Promise.all(foods.map(async food => {
            return Food.find(food.food_id)
          }));

          foods = foods.map(food => {
            food = food.serialized;
            delete food['id'];
            return food;
          });

          template.timesEaten = max;
          template.foods = foods;

          resolve(template);
        });
    })
  }
}

module.exports = Food;
