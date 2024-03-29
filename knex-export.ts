import knex from 'knex';
import envs from './envs';
import knexfile from './knexfile';

const environment = envs.NODE_ENV || 'development';
const config = knexfile[environment];

export default knex(config);
