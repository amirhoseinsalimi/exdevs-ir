/* tslint:disable */

import { createServer } from 'http';
import app from '../bootstrap/app';

const knex = require('../knex-export');
const {
  PORT: port,
} = require('../env');

let server;

before(async () => {
  await knex.migrate.latest();
  await knex.seed.run();

  server = await createServer(app);
  server.listen(port);
});

after(async () => {
  await server.close();

  await knex.migrate.rollback();
});
