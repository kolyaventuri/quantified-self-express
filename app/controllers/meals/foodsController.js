const Meal = require('../../models/meal');
const Food = require('../../models/food');
const MealFood = require('../../models/mealFood');

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

  static destroy(req, res, next) {
    Meal.find(req.params.meal_id).then(meal => {
      if(!meal) return res.status(404).send();

      Food.find(req.params.id).then(food => {
        if(!food) return res.status(404).send();

        MealFood.where({ meal_id: meal._data.id, food_id: food._data.id }, 'meal_foods').then(mfs => {
          mfs = mfs.map(mf => mf.destroy());
          Promise.all(mfs).then(() => {
              res.json({ message: `Successfully removed ${food._data.name} from ${meal._data.name}`});
            }).catch(err => {
              console.error(err);
              res.status(500).send();
            });
        }).catch(err => {
          console.log(err);
          res.status(500).send();
        })
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
