describe('Meal', () => {
  it('should require a name', () => {
    let meal = new Meal({});
    let meal2 = new Food({ name: 'Meal' })

    expect(meal.isValid).to.be.false;
    expect(meal2.isValid).to.be.true;
  });
});
