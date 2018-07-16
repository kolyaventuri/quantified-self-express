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

    return new Promise((resolve, reject) => {
      Meal.all().then(meals => {
        let foods = {};

        for(let meal of meals) {
          meal.foods.then(_foods => {
            for(let food of _foods) {
            }
          });
        }
      }).catch(reject);
    });
  }
}

module.exports = Food;
