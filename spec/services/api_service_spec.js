const APIService = require('../../app/services/APIService');

describe('APIService', () => {
  it('should be able to make a get request', (done) => {
    let API = APIService.register('https://jsonplaceholder.typicode.com', {});

    let result = API.get('/posts/1', {});

    expect(result).to.be.a('promise');

    result.then((data) => {
      expect(data).to.be.an('object');
      done();
    }).catch(err => {
      done(err);
    });
  });
});
