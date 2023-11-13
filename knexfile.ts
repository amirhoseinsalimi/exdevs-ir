/* Knex.js configuration
   See http://knexjs.org/ for documents
* */
import envs from './envs';

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: `${__dirname}/${envs.DB_NAME}`,
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
    client: 'mysql2',
    connection: {
      filename: `${__dirname}/${envs.DB_NAME}`,
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
    client: 'sqlite3',
    connection: {
      filename: `${__dirname}/${envs.DB_NAME}`,
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
