var express = require('express');
var router = express.Router();

const Food = require('../../../../app/models/food');

router.post('/', (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
