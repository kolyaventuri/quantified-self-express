describe('Food', () => {
  it('should require a name', () => {
    let food = new Food({ calories: 20 });
    let food2 = new Food({ name: 'a', calories: 20 })

    expect(food.isValid).to.be.false;
    expect(food2.isValid).to.be.true;
  });

  it('should require calories', () => {
    let food = new Food({ name: 'a' });
    let food2 = new Food({ name: 'a', calories: 20 })

    expect(food.isValid).to.be.false;
    expect(food2.isValid).to.be.true;
  });

  describe('.favorites', () => {
    it('returns an array of favorite foods', () => {
      /** START GENERATE MOCK DATA **/

      let foods = [
        new Food({ name: 'Banana', calories: 200 }),
        new Food({ name: 'Meatloaf', calories: 800 }),
        new Food({ name: 'Cabbage', calories: 100 })
      ];

      let meal1 = new Meal({ name: 'A' });
      let meal2 = new Meal({ name: 'B' });

      foods.map(food => meal1.add_food);
      foods.slice(0,2).map(food => meal1.add_food);
      meal1.add_food(foods[0]);

      /** END GENERATE MOCK DATA **/

      let result = Food.favorites();

      expect(result).to.be.an('object');

      expect(result).to.have.property('timesEaten').that.eqls(2);
      expect(result).to.have.property('foods').that.is.an('array');

      expect(result.foods).to.have.lengthOf(2);
      expect(result.foods[0]).to.have.property('name').that.eqls(foods[0].name);
      expect(result.foods[1]).to.have.property('name').that.eqls(foods[1].name);
    });
  });
});
