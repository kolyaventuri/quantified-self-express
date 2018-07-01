describe('Food', () => {
  it('should require a name', () => {
    let food = new Food({ calories: 20 });

    expect(food.isValid).to.be.false;
  });
});
