const APIService = require('./APIService');
const BASE_URL = 'http://api.yummly.com/v1/api';

const headers = {
  'X-Yummly-App-ID': process.env.YUMMLY_APP_ID,
  'X-Yummly-App-Key': process.env.YUMMLY_APP_KEY
};

const API = APIService.register(BASE_URL, headers);

class Yumly {

  static async recipes(query) {
    return API.get('/recipes', { q: query, maxResult: 10 });
  }

}

module.exports = Yumly;
