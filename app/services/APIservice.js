const RequestBuilder = require('./requestBuilder');

class APIService {

  constructor(url, headers) {
    this.BASE_URL = url;
    this.headers = headers;
  }

  async get(url, parameters) {
    
  }

  static register(url, headers) {
    return new this(url, headers);
  }

}

module.exports = APIService;
