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

  static favorites() {
    let template = {
      timesEaten: 0,
      foods: []
    };

    return new Promise(async (resolve, reject) => {
      let meals = await Meal.all();
      let foods = {};

      for(let meal of meals) {
        let _foods = await meal.foods;

        for(let food of _foods) {
          foods[food._data.id] = foods[food._data.id] || {
            count: 0,
            serialized: food.serialized
          };

          foods[food._data.id].count += 1;
        }
      }

      resolve(foods);
    });
  }
}

module.exports = Food;
