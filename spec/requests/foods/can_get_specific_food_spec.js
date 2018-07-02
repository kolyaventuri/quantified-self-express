describe('A GET request to a specific /api/v1/foods/:id', () => {
  it('should return a JSON object representing the food', (done) => {
    let foods = [
      { name: 'Toast', calories: 10 },
      { name: 'Toast', calories: 20 },
      { name: 'Toast', calories: 30 },
    ];

    Promise.all([
      new Food(foods[0]).save(),
      new Food(foods[1]).save(),
      new Food(foods[2]).save(),
    ]).then((data) => {
      data = data.sort((a, b) => {
        a = a[0]; b = b[0];
        if(a.id > b.id) return 1;
        if(a.id < b.id) return -1;
        return 0;
      });
      chai.request(app)
        .get(`/api/v1/foods/${data[0][0].id}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');

          let food = data[0][0];
          expect(res.body).to.have.property('id').that.eqls(food.id);
          expect(res.body).to.have.property('name').that.eqls(food.name);
          expect(res.body).to.have.property('calories').that.eqls(food.calories);

          expect(res.body).to.not.have.property('created_at');
          expect(res.body).to.not.have.property('updated_at');

          done();
        });
    }).catch(err => {
      done(err);
    });
  });

  it('should return a 404 status if the food does not exist', () => {
    chai.request(app)
      .get('/api/v1/foods/1000')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404)
        done();
      });
  });
});
