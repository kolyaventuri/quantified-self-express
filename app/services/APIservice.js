const RequestBuilder = require('./requestBuilder');
const request = require('request-promise');

class APIService {

  constructor(url, headers) {
    this.builder = RequestBuilder.register(url, headers);
  }

  async get(url, parameters) {
    let opts = this.builder.build(url, parameters);

    return await request(opts);
  }

  static register(url, headers) {
    return new this(url, headers);
  }

}

module.exports = APIService;
