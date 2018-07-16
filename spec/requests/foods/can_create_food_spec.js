describe('A POST request to /api/v1/foods', () => {
  it('should create a food', (done) => {
    let food = {
      food: {
        name: 'Test',
        calories: 20
      }
    };
    chai.request(app)
      .post('/api/v1/foods')
      .send(food)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name').that.eqls(food.food.name);
        expect(res.body).to.have.property('calories').that.eqls(food.food.calories);
        done(err);
      });
  });

  it('should return a 400 status if the food is invalid', (done) => {
    let food = {
      food: { name: 'Test' }
    };
    chai.request(app)
      .post('/api/v1/foods')
      .send(food)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

