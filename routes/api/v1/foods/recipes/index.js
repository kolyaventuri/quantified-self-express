const express = require('express');
const router = express.Router({mergeParams: true});

const FoodRecipesController = require('../../../../../app/controllers/foodRecipesController');

router.get('/', FoodRecipesController.index);

module.exports = router;
