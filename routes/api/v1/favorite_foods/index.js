const express = require('express');
const router = express.Router();

const FavoriteFoodsController = require('../../../../app/controllers/favoriteFoodsController');

router.get('/', FavoriteFoodsController.index);

module.exports = router;
