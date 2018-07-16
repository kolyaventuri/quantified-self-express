const Yummly = require('../../app/services/yummlyService');

describe('Yummly Service', () => {
  it('has an api key available', () => {
    expect(process.env.YUMMLY_API_KEY).to.not.be.null;
  });

});
