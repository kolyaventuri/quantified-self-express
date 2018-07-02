const Meal = require('../../models/meal');

class FoodsController {
  static create(req, res, next) {
    Meal.find(req.params.meal_id).then(meal => {
      if(!meal) return res.status(404).send();

      Food.find(req.params.id).then(food => {
        if(!food) return res.status(404).send();

        meal.add_food(food).then(() => {
          res.status(201).json({ message: `Successfully added ${food._data.name} to ${meal._data.name}`});
        }).catch(err => {
          console.error(err);
          res.status(500).send();
        });
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
