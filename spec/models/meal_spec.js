describe('Meal', () => {
  it('should require a name', () => {
    let meal = new Meal({});
    let meal2 = new Meal({ name: 'Meal' })

    expect(meal.isValid).to.be.false;
    expect(meal2.isValid).to.be.true;
  });

  it('should have many foods', (done) => {
    let create = new Array(3).fill(null).map(() => {
      return new Food({ name: 'Toast', calories: 30 }).save()
    });
    create.push(new Meal({ name: 'Breakfast' }).save());

    Promise.all(create)
      .then((data) => {
        Food.all().then(foods => {
          Meal.find(1).then(meal => {
            meal.foods.then(_foods => {
              expect(_foods).to.be.an('array');
              expect(_foods).to.have.lengthOf(0);

              Promise.all([
                meal.add_food(foods[0]),
                meal.add_food(foods[1])
              ]).then(() => {
                meal.save().then(data => {
                  meal.foods.then(_foods => {
                    expect(_foods).to.have.lengthOf(2);
                    done();
                  }).catch(done);
                }).catch(done);
              });
            }).catch(done);
          });
        }).catch(done);
      }).catch(done);
  });
});
