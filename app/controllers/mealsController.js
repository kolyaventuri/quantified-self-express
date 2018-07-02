const Meal = require('../models/meal');

class MealsController {
  static index(req, res, next) {
    Meal.all().then(meals => {
      let foods = meals.map(meal => {
        return meal.foods;
      });

      Promise.all(foods)
        .then(foods => {
          meals = meals.map((meal, i) => {
            let _foods = foods[i].map(food => food.serialized);
            return Object.assign(meal.serialized, { foods: _foods });
          });
          res.json(meals);
        }).catch(err => {
          console.error(err);
          res.status(500).send();
        });

    }).catch(err => {
      console.error(err);
      res.status(500).send();
    });
  }
}

module.exports = MealsController;
