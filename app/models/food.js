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
      let result = [];

      db('meal_foods')
        .distinct('food_id')
        .groupBy('meal_foods.food_id')
        .count('food_id')
        .then(async data => {
          let counts = new Set(data.map(mf => Number.parseInt(mf.count)).sort().reverse());
          for(let count of counts) {
            let foods = data.filter(mf => mf.count == count);

            foods = await Promise.all(foods.map(async food => {
              return Food.find(food.food_id)
            }));

            foods = foods.map(food => {
              food = food.serialized;
              delete food['id'];
              return food;
            });

            result.push({
              timesEaten: count,
              foods
            });
          }
          resolve(result);
        });
    })
  }
}

module.exports = Food;
