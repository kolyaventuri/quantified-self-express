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
                expect(result).to.be.an('array');

                expect(result[0]).to.have.property('timesEaten').that.eqls(2);
                expect(result[0]).to.have.property('foods').that.is.an('array');

                expect(result[0].foods).to.have.lengthOf(2);
                expect(result[0].foods[0]).to.have.property('name').that.eqls(foods[0]._data.name);
                expect(result[0].foods[1]).to.have.property('name').that.eqls(foods[1]._data.name);

                expect(result[1]).to.have.property('timesEaten').that.eqls(1);
                expect(result[1].foods).to.have.lengthOf(1);
                expect(result[1].foods[0]).to.have.property('name').that.eqls(foods[2]._data.name);


                expect(result[0].foods[0]).to.have.property('mealsWhenEaten').that.is.an('array');
                expect(result[0].foods[0].mealsWhenEaten).to.have.lengthOf(2);
                expect(result[0].foods[0].mealsWhenEaten[0]).to.eql(meal1._data.name);

                done();
              }).catch(err => { done(err); });
            }).catch(err => { done(err); });
          });
        });
      });

    });
  });

  describe('#recipes', () => {
    let recipeOne = null;

    it('returns an array of up to 3 recipes for that food', async () => {
      let food = new Food({ name: 'banana', calories: 80 });

      let recipes = await food.recipes();

      expect(recipes).to.be.an('array');

      expect(recipes[0]).to.have.property('name');
      expect(recipes[0]).to.have.property('url');

      recipeOne = recipes[0];
    });

    it('can return the next 3 recipes', async () => {
      let food = new Food({ name: 'banana', calories: 80 });

      let recipes = await food.recipes(2);

      expect(recipes).to.be.an('array');

      expect(recipes[0]).to.have.property('name');
      expect(recipes[0]).to.have.property('url');

      expect(recipes[0].name).to.not.eql(recipeOne.name);
    });
  });
});
