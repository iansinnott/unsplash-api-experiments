// Polyfill for unsplash
global.fetch = require('node-fetch');
const { default: Unsplash, toJson } = require('unsplash-js'); // ES module...

const config = require('./secrets.json');

// Very low, for now
const LIMIT = 3;

const main = (query = '') => {
  if (query.length < 3) {
    throw new Error('Query must be at least 3 characters long');
  }

  const unsplash = new Unsplash({
    applicationId: config.applicationId,
    secret: config.secret,
  });

  unsplash.search.photos(query, 1/* page */, LIMIT)
    .then(toJson)
    .then(json => {
      console.log('made it out', json);
    })
    .catch(err => {
      console.error(err);
      process.exitStatus = 1;
    });
};

main(process.argv[2]);
