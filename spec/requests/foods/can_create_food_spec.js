describe('A POST request to /api/v1/foods', (done) => {
  let food = {
    name: 'Test',
    calories: 20
  };
  chai.request(app)
    .post('/api/v1/foods')
    .send(food)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('name').that.eqls(food.name);
      expect(res.body).to.have.property('calories').that.eqls(food.calories);
    });
});
