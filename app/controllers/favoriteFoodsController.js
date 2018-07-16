const Food = require('../models/food');

class FavoriteFoodsController {
  static async index(req, res, next) {
    let favorites = await Food.favorites();

    res.json(favorites);
  }
}

module.exports = FavoriteFoodsController;
