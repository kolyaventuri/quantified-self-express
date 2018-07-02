const express = require('express');
const router = express.Router();

const MealsController = require('../../../../app/controllers/mealsController');
const FoodsController = require('../../../../app/controllers/meals/foodsController');

router.get('/', MealsController.index);
router.post('/:meal_id/foods/:id', FoodsController.create);

module.exports = router;
