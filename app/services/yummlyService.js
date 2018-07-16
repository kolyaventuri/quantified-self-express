const APIService = require('./APIService');
const BASE_URL = 'http://api.yummly.com/v1';

const headers = {
  'X-Yummly-App-ID': process.env.YUMMLY_APP_ID,
  'X-Yummly-App-Key': process.env.YUMMLY_APP_KEY
};

const API = APIService.register(BASE_URL, headers);

class Yumly {

  static async recipes(query) {
    return await API.get('/recipes', { q: query });
  }

}

module.exports = Yumly;
