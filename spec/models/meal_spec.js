describe('Meal', () => {
  it('should require a name', () => {
    let meal = new Meal({});
    let meal2 = new Meal({ name: 'Meal' })

    expect(meal.isValid).to.be.false;
    expect(meal2.isValid).to.be.true;
  });

  it('should have many foods', (done) => {
    let meal = new Meal({ name: 'Breakfast' });
    let foods = new Array(3).map(() => {
      new Food({ name: 'Toast', calories: 30 }).save()
    });

    Promise.all(foods)
      .then((data) => {
        expect(meal.foods).to.be.an('array');
        expect(meal.foods).to.have.lengthOf(0);

        meal.foods.push(foods[0]);
        meal.foods.push(foods[1]);
        meal.save().then(data => {
          expect(data.foods).to.have.lengthOf(2);
          done();
        }).catch(err => {
          done(err);
        })
      }).catch(err => {
        done(err);
      });
  });
});
