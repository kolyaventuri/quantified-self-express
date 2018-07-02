describe('A GET request to /api/v1/foods', () => {
  it('should return a JSON array of the foods', (done) => {
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
        .get('/api/v1/foods')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(3);

          for(let i = 0; i < data.length; i++) {
            let food = data[i][0];
            expect(res.body[i].id).to.eq(food.id);
            expect(res.body[i].name).to.eq(food.name);
            expect(res.body[i].calories).to.eq(food.calories);
            expect(res.body[i]).to.not.have.property('created_at');
            expect(res.body[i]).to.not.have.property('updated_at');
          }

          done();
        });
    }).catch(err => {
      done(err);
    });

  });
});
