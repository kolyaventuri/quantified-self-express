const Food = require('../models/food');

class FoodsController {
  static index(req, res, next) {
    Food.all().then(foods => {
      res.json(foods.map(food => food.serialized));
    }).catch(err => {
      console.error(err);
      res.status(500).send();
    });
  }

  static show(req, res, next) {
    Food.find(req.params.id).then(food => {
      if(!food) return res.status(404).send();
      res.json(food.serialized);
    }).catch(err => {
      console.error(err);
      res.status(500).send();
    });
  }

  static create(req, res, next) {
    let food = new Food(req.body.food);

    if(!food.isValid) return res.status(400).send();

    food.save().then(data => {
      res.json(data[0]);
    }).catch(err => {
      console.error(err);
      res.status(500).send();
    });
  }

  static update(req, res, next) {
    
  }
}

module.exports = FoodsController;
