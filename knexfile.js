/* Knex.js configuration
   See http://knexjs.org/ for documents
* */
const {
  DB_NAME: database,
  DB_USERNAME: user,
  DB_PASSWORD: password,
} = require('./env');

module.exports = {
  development: {
    client: 'mysql2', // Your database driver
    connection: {
      database,
      user,
      password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/database/seeds`,
    },
  },

  testing: {
    client: 'mysql2', // Your database driver
    connection: {
      database,
      user,
      password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/database/seeds`,
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      database,
      user,
      password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/database/seeds`,
    },

  },
};
