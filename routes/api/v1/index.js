var express = require('express');
var router = express.Router();

router.use('/foods', require('./foods'));
router.use('/meals', require('./meals'));

module.exports = router;
