const {
  DB_HOST: host,
  DB_NAME: database,
  DB_USERNAME: user,
  DB_PASSWORD: password,
} = require('./env');

const connection = {
  client: 'mysql',
  connection: {
    host,
    database,
    user,
    password,
  },
};

module.exports = connection;
