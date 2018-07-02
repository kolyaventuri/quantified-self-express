var express = require('express');
var router = express.Router();

router.use('/foods', require('./foods'));

module.exports = router;
