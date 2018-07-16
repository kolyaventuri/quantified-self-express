const Yummly = require('../../app/services/yummlyService');

describe('Yummly Service', () => {
  it('has an api key available', () => {
    expect(process.env.YUMMLY_API_KEY).to.not.be.null;
  });

  it('can query recipes', () => {
    let result = Yummly.recipes('onion soup');

    expect(result).to.be.an('object');

    expect(result).to.have.property('matches').that.is.an('array');
  });
});
