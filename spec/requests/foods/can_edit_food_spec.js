describe('A PATCH request to a specific /api/v1/foods/:id', () => {
  it('should update the model', (done) => {
    let _food = { name: 'Toast', calories: 7 };
    new Food(_food).save()
      .then((data) => {
        let food = data[0];
        let newFood = { name: 'Oyster' }

        chai.request(app)
          .patch(`/api/v1/foods/${food.id}`)
          .send({food: newFood})
          .end((err, res) => {
            expect(err).to.be.null;

            expect(res).to.have.status(200);

            expect(res.body).to.have.property('id').that.eqls(food.id);
            expect(res.body).to.have.property('name').that.eqls(newFood.name);
            expect(res.body).to.have.property('calories').that.eqls(_food.calories)

            done();
          });
      }).catch(err => {
        done(err);
      });
  });

  it('should return a 400 status code if the food is not found', (done) => {
    chai.request(app)
      .patch('/api/v1/foods/1000')
      .send({food: { name: 'Waffle' }})
      .end((err, res) => {
        expect(err).to.be.null;

        expect(res).to.have.status(400);

        done();
      });
  });
});
