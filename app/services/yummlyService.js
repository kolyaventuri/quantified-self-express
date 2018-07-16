const APIService = require('./APIservice');
const BASE_URL = 'http://api.yummly.com/v1/api';

const headers = {
  'X-Yummly-App-ID': process.env.YUMMLY_APP_ID,
  'X-Yummly-App-Key': process.env.YUMMLY_APP_KEY
};

const API = APIService.register(BASE_URL, headers);
const PAGE_LIMIT = 3;

class Yumly {

  static async recipes(query, page) {
    page = page || 0;
    return API.get('/recipes', { q: query, maxResult: PAGE_LIMIT, start: (PAGE_LIMIT * page)});
  }

}

module.exports = Yumly;
