const Meal = require('../../models/meal');

class FoodsController {
  static show(req, res, next) {
    Meal.find(req.params.meal_id).then(meal => {

      meal.foods
        .then(foods => {
          let _foods = foods.map(food => food.serialized);
          meal = Object.assign(meal.serialized, { foods: _foods });

          res.json(meal);
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

module.exports = FoodsController;
