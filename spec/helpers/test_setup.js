const DatabaseCleaner = require('./databaseCleaner');
const glob = require('glob');
const path = require('path');

// Load models
let files = glob.sync(path.join(__dirname, '../../app/models/**/*.js'));
let models = files.map(require);
for(let model of models) {
  global[model.name] = model;
}

beforeEach((done) => {
  DatabaseCleaner.clean()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});
