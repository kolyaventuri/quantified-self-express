const Food = require('../models/food');

class FoodRecipesController {

  static async index(req, res, next) {
    let food = await Food.find(req.params.id);

    let recipes = await food.recipes(req.query.page || 1);

    res.json({
      recipes
    });
  }

}

module.exports = FoodRecipesController;
