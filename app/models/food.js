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
      db('foods')
        .join('meal_foods', 'foods.id', '=', 'meal_foods.food_id')
        .join('meals', 'meal_foods.meal_id', '=', 'meals.id')
        .distinct('meal_foods.food_id')
        .select(
          'foods.calories',
          'foods.name as food_name',
          'meals.name as meal_name')
        .then(_foods => {
          let foods = {};
          for(let food of _foods) {
            let id = Number.parseInt(food.food_id);
            foods[id] = foods[id] || {
              timesEaten: 0,
              data: {
                name: food.food_name,
                calories: food.calories,
                mealsWhenEaten: []
              }
            };

            foods[id].timesEaten++;
            foods[id].data.mealsWhenEaten.push(food.meal_name);
          }

          let times = {};

          for(let food of Object.values(foods)) {
            times[food.timesEaten] = times[food.timesEaten] || [];
            times[food.timesEaten].push(food.data);
          }

          result = Object.values(times).sort((a, b) => {return b.length - a.length; });

          result = result.map(item => {
            return {
              timesEaten: item.length,
              foods: item
            };
          });

          return resolve(result)
        });
    })
  }
}

module.exports = Food;
