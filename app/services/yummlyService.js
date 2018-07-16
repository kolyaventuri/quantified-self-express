const APIService = require('./APIService');

class Yumly {

  static async recipes(query) {
    return await APIService.get('/recipe', { q: query })
  }

}

module.exports = Yumly;
