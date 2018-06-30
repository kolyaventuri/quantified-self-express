const Food = require('../../app/models/food');

describe('Food', () => {
  it('should not be valid if no name is present', (done) => {
    let food = Food.forge({calories: 20});

    food.save().then((a) => {
      done(new Error('Food shouldn\'t have validated presence of name.'));
    }).catch((err) => {
      expect(err.message).to.eq('Missing Attribute: name');
      done();
    });
  });
});
