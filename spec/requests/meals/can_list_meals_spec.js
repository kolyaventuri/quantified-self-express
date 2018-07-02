describe('A GET request to /api/v1/meals', () => {
  it('should return a JSON array of meals with foods', (done) => {
    let create = new Array(3).fill(null).map((e, i) => {
      return new Meal({ name: 'Meal ' + i }).save();
    });

    create.push(new Food({ name: 'Toast', calories: 30 }).save());
    create.push(new Food({ name: 'Jam', calories: 20 }).save());


    Promise.all(create)
      .then(() => {
        Meal.find(1).then(meal => {
          Food.all().then(foods => {
            Promise.all([
              meal.add_food(foods[0]),
              meal.add_food(foods[1])
            ]).then(() => {
              chai.request(app)
                .get('/api/v1/meals')
                .end((err, res) => {
                  expect(err).to.be.null;

                  expect(res).to.have.status(200);

                  expect(res.body).to.be.an('array').with.lengthOf(3);

                  let _meal = res.body[0];
                  expect(_meal).to.have.property('id').that.eqls(meal._data.id);
                  expect(_meal).to.have.property('name').that.eqls(meal._data.name);
                  expect(_meal).to.have.property('foods').that.is.an('array').with.lengthOf(2);
                });
            }).catch(done);
          }).catch(done);
        }).catch(done);
      }).catch(done);
  });
});
