describe('A GET request to /api/v1/favorite_foods', () => {
  it('returns a JSON object representing favorite foods', (done) => {
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
              chai.request(app)
                .get('/api/v1/favorite_foods')
                .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res.body).to.be.an('array');

                  let result = res.body;

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
                });
            }).catch(err => { done(err); });
          });
        });
      });
  })
});
