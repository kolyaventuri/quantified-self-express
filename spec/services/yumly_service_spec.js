const Yumly = require('../../app/services/yumly');

describe('Yumly Service', () => {
  it('has an api key available', () => {
    expect(process.env.YUMLY_API_KEY).to.not.be.null;
  });
});
