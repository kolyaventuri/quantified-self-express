const DatabaseCleaner = require('./databaseCleaner');

beforeEach((done) => {
  DatabaseCleaner.clean().then(() => {
    done();
  }).catch((e) => {
    console.error(e);
    done();
  });
});
