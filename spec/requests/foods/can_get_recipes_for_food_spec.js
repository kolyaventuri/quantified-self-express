describe('A GET request to a specific /api/v1/foods/:id/recipes', () => {
  let recipeOne = null;

  it('returns a JSON object of 3 recipes', (done) => {
    let food = new Food({ name: 'Banana', calories: 80 })
    food.save().then(() => {
      Food.all().then(foods => {
        food = foods[0];

        chai.request(app)
          .get(`/api/v1/foods/${food._data.id}/recipes`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');

            let result = res.body;

            let recipes = result.recipes;

            expect(recipes).to.be.an('array');

            expect(recipes[0]).to.have.property('name');
            expect(recipes[0]).to.have.property('url');

            recipeOne = recipes[0];
            done();
          });
      });
    });
  });

  it('can return the next 3 items', (done) => {
    let food = new Food({ name: 'Banana', calories: 80 })
    food.save().then(() => {
      Food.all().then(foods => {
        food = foods[0];

        chai.request(app)
          .get(`/api/v1/foods/${food._data.id}/recipes?page=2`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');

            let result = res.body;

            let recipes = result.recipes;

            expect(recipes).to.be.an('array');

            expect(recipes[0]).to.have.property('name');
            expect(recipes[0]).to.have.property('url');

            expect(recipes[0].name).to.not.eql(recipeOne.name);
            done();
          });
      });
    });
  });
});
