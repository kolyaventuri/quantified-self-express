var express = require('express');
var router = express.Router();

const FoodsController = require('../../../../app/controllers/foodsController');

router.get('/',    FoodsController.index);
router.get('/:id', FoodsController.show);
router.post('/',   FoodsController.create);

router.patch('/:id',  FoodsController.update)
router.put('/:id',    FoodsController.update)
router.delete('/:id', FoodsController.destroy)

router.use('/:id/recipes', require('./recipes'));

module.exports = router;
