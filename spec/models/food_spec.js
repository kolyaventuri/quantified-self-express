describe('Food', () => {
  it('should require a name', () => {
    let food = new Food({ calories: 20 });
    let food2 = new Food({ name: 'a', calories: 20 })

    expect(food.isValid).to.be.false;
    expect(food2.isValid).to.be.true;
  });

  it('should require calories', () => {
    let food = new Food({ name: 'a' });
    let food2 = new Food({ name: 'a', calories: 20 })

    expect(food.isValid).to.be.false;
    expect(food2.isValid).to.be.true;
  });

  describe('.favorites', () => {
    it('returns an array of favorite foods', (done) => {
      /** START GENERATE MOCK DATA **/

      let foods = [
        new Food({ name: 'Banana', calories: 200 }).save(),
        new Food({ name: 'Meatloaf', calories: 800 }).save(),
        new Food({ name: 'Cabbage', calories: 100 }).save()
      ];


      let _meals = [
        new Meal({ name: 'A' }).save(),
        new Meal({ name: 'B' }).save()
      ];

      Promise.all([..._meals, ...foods]).then(() => {
        Meal.all().then(meals => {
          let [meal1, meal2] = meals;
          Food.all().then(foods => {
            Promise.all([
              meal1.addFood(foods[0]),
              meal1.addFood(foods[1]),
              meal1.addFood(foods[2]),
              meal2.addFood(foods[0]),
              meal2.addFood(foods[1]),
            ]).then(() => {
              /** END GENERATE MOCK DATA **/
              Food.favorites().then(result => {
                eval(pry.it)
                expect(result).to.be.an('object');

                expect(result).to.have.property('timesEaten').that.eqls(2);
                expect(result).to.have.property('foods').that.is.an('array');

                expect(result.foods).to.have.lengthOf(2);
                expect(result.foods[0]).to.have.property('name').that.eqls(foods[0].name);
                expect(result.foods[1]).to.have.property('name').that.eqls(foods[1].name);

                done();
              }).catch(err => { done(err); });
            }).catch(err => { done(err); });
          });
        });
      });

    });
  });
});
