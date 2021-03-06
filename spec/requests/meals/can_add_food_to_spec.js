describe('A POST request to a specific /api/v1/meals/:meal_id/foods/:id', () => {
  it('should add the specificed food to the meal', (done) => {
    let create = new Array(3).fill(null).map((e, i) => {
      return new Meal({ name: 'Meal ' + i }).save();
    });

    create.push(new Food({ name: 'Toast', calories: 30 }).save());
    create.push(new Food({ name: 'Jam', calories: 20 }).save());

    Promise.all(create)
      .then(() => {
        Meal.find(1).then(meal => {
          Food.all().then(foods => {
            let food = foods[0];
            chai.request(app)
              .post(`/api/v1/meals/${meal._data.id}/foods/${food._data.id}`)
              .end((err, res) => {
                expect(err).to.be.null;

                expect(res).to.have.status(201);

                expect(res.body).to.have.property('message').that.eqls(`Successfully added ${food._data.name} to ${meal._data.name}`);
                done();
              });
          }).catch(done);
        }).catch(done);
      }).catch(done);
  });

  it('should return a 404 if the meal does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/meals/1000/foods/20')
      .end((err, res) => {
        expect(err).to.be.null;

        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return a 404 if the food does not exist', (done) =>{
    new Meal({ name: 'Breakfast' }).save()
      .then(() => {
        Meal.all().then(meals => {
          let meal = meals[0];
          chai.request(app)
            .post(`/api/v1/meals/${meal._data.id}/foods/20`)
            .end((err, res) => {
              expect(err).to.be.null;

              expect(res).to.have.status(404);
              done();
            });
        }).catch(done);
      }).catch(done);
  });
});
