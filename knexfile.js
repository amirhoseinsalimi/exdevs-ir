/* Knex.js configuration
   See http://knexjs.org/ for documents
* */
const {
  DB_NAME: database,
  DB_USERNAME: user,
  DB_PASSWORD: password,
} = require('./config');

module.exports = {
  development: {
    client: 'mysql', // Your database driver
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

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  production: {
    client: 'mysql',
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
    },
  },
};
