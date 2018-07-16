const Food = require('../models/food');

class FavoriteFoodsController {
  static async index() {
    let favorites = await Food.favorites();

    res.json(favorites);
  }
}

module.exports = FavoriteFoodsController;
