const querystring = require('querystring');

class RequestBuilder {

  constructor(url, headers) {
    this.BASE_URL = url;
    this.headers = headers;
  }

  build(url, params) {
    let _url = `${this.BASE_URL}${url}`;
    let query = querystring.stringify(params);

    let opts = {
      uri: `${_url}?${query}`,
      headers: this.headers,
      json: true 
    };

    return opts;
  }

  static register(url, headers) {
    return new this(url, headers);
  }
}

module.exports = RequestBuilder;
