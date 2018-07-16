const RequestBuilder = require('../../app/services/requestBuilder');

describe('Request Builder', () => {
  it('should be able to build request options', () => {
    let builder = RequestBuilder.register('AURL', {h: 1});

    let result = builder.build('/end', {q:2});

    expect(result).to.eql({
      uri: 'AURL/end?q=2',
      headers: {
        h: 1
      },
      json: true
    });
  });
});
