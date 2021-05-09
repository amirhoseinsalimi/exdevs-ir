const dotenv = require('dotenv');

const result = dotenv.config({
  // eslint-disable-next-line no-confusing-arrow
  path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

if (result.error) {
  throw result.error;
}

const { parsed: envs } = result;

module.exports = envs;
