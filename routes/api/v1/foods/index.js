var express = require('express');
var router = express.Router();

const Food = require('../../../../app/models/food');

router.post('/', (req, res, next) => {
  let food = new Food(req.body.food);

  if(!food.isValid) return res.status(400).send();

  food.save().then(data => {
    res.json(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send();
  })
});

module.exports = router;
