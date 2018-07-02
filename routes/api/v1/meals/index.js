const express = require('express');
const router = express.Router();

const MealsController = require('../../../../app/controllers/mealsController');
const FoodsController = require('../../../../app/controllers/meals/foodsController');

router.get('/', MealsController.index);
router.get('/:meal_id/foods', FoodsController.show)
router.post('/:meal_id/foods/:id', FoodsController.create);
router.delete('/:meal_id/foods/:id', FoodsController.destroy)

module.exports = router;
