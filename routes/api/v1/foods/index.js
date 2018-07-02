var express = require('express');
var router = express.Router();

const FoodsController = require('../../../../app/controllers/foodsController');

router.get('/', FoodsController.index);

router.get('/:id', FoodsController.show);

router.post('/', FoodsController.create);

module.exports = router;
