describe('Meal', () => {
  it('should require a name', () => {
    let meal = new Meal({});
    let meal2 = new Meal({ name: 'Meal' })

    expect(meal.isValid).to.be.false;
    expect(meal2.isValid).to.be.true;
  });

  it('should have many foods', (done) => {
    let meal = new Meal({ name: 'Breakfast' });
    let foods = new Array(3).fill(null).map(() => {
      return new Food({ name: 'Toast', calories: 30 }).save()
    });

    Promise.all(foods)
      .then((data) => {
        Food.all().then(foods => {
          meal.foods.then(_foods => {
            expect(_foods).to.be.an('array');
            expect(_foods).to.have.lengthOf(0);

            meal.foods.push(foods[0]);
            meal.foods.push(foods[1]);
            meal.save().then(data => {
              meal.foods.then(_foods => {
                expect(_foods).to.have.lengthOf(2);
                done();
              }).catch(done);
            }).catch(done);
          }).catch(done);
        }).catch(done);
      }).catch(done);
  });
});
