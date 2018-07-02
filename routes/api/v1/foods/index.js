var express = require('express');
var router = express.Router();

const Food = require('../../../../app/models/food');

router.get('/', (req, res, next) => {
  Food.all().then(foods => {
    res.json(foods);
  }).catch(err => {
    console.error(err);
    res.status(500).send();
  })
});

router.get('/:id', (req, res, next) => {
  Food.find(req.params.id).then(food => {
    res.json(food);
  }).catch(err => {
    console.error(err);
    res.status(500).send();
  });
});

router.post('/', (req, res, next) => {
  let food = new Food(req.body.food);

  if(!food.isValid) return res.status(400).send();

  food.save().then(data => {
    res.json(data[0]);
  }).catch(err => {
    console.error(err);
    res.status(500).send();
  });
});

module.exports = router;
