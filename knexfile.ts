/* Knex.js configuration
   See http://knexjs.org/ for documents
* */
import envs from './envs';

export default {
  development: {
    client: 'mysql2',
    connection: {
      database: envs.DB_NAME,
      user: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
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
      database: envs.DB_NAME,
      user: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
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
      database: envs.DB_NAME,
      user: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
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
