const {
  NODE_ENV: env,
} = require('./env');

const environment = env || 'development';
const config = require('./knexfile')[environment];

module.exports = require('knex')(config);
