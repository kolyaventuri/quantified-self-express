describe('A DELETE request to a specific /api/v1/foods/:id', () => {
  it('should delete the model', (done) => {
    let _food = { name: 'Toast', calories: 7 };
    new Food(_food).save()
      .then((data) => {
        let food = data[0];

        chai.request(app)
          .delete(`/api/v1/foods/${food.id}`)
          .end((err, res) => {
            expect(err).to.be.null;

            expect(res).to.have.status(204);

            Food.find(food.id).then((data) => {
              expect(data).to.be.false;
              done();
            }).catch(err => {
              done(err);
            });
          });
      }).catch(err => {
        done(err);
      });
  });

  it('should return a 404 status code if the food is not found', (done) => {
    chai.request(app)
      .delete('/api/v1/foods/1000')
      .end((err, res) => {
        expect(err).to.be.null;

        expect(res).to.have.status(404);

        done();
      });
  });
});
