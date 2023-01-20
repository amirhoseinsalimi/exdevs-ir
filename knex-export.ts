import knex from 'knex';
import envs from './envs';
import knexfile from './knexfile';

const environment = envs.NODE_ENV || 'development';
// @ts-ignore
const config = knexfile[environment];

export default knex(config);
