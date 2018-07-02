const Meal = require('../models/meal');

class MealsController {
  static index(req, res, next) {
    Meal.all().then(meals => {
      meals = meals.map(meal => {
        return meal.serialized;
      });

      res.json(meals);
    }).catch(err => {
      console.error();
      res.status(500).send();
    });
  }
}

module.exports = MealsController;
