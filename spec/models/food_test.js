const Food = require('../../app/models/food');

describe('Food', () => {
  it('should validate presence of name', (done) => {
    const food = Food.forge({calories: 20});

    food.save().then((a) => {
      done(new Error('Food shouldn\'t have validated presence of name.'));
    }).catch((err) => {
      expect(err.message).to.eq('Missing Attribute: name');
      done();
    });
  });

  it('should validate presence of calories', (done) => {
    const food = Food.forge({name: 'Foo'});

    food.save().then((a) => {
      done(new Error('Food shouldn\'t have validated presence of name.'));
    }).catch((err) => {
      expect(err.message).to.eq('Missing Attribute: calories');
      done();
    });
  });
});
