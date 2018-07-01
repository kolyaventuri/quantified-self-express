describe('Food', () => {
  it('should require a name', () => {
    let food = new Food({ calories: 20 });
    let food2 = new Food({ name: 'a', calories: 20 })

    expect(food.isValid).to.be.false;
    expect(food2.isValid).to.be.true;
  });
});
