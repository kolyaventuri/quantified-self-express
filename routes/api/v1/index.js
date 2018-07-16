var express = require('express');
var router = express.Router();

router.use('/foods', require('./foods'));
router.use('/meals', require('./meals'));
router.use('/favorite_foods', require('./favorite_foods'));

module.exports = router;
