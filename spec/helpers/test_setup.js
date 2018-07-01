const DatabaseCleaner = require('./databaseCleaner');

beforeEach((done) => {
  DatabaseCleaner.clean()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});
