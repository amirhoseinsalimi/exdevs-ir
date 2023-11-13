/* tslint:disable */

import type { Server } from 'http';

import * as http from 'http';
import app from '../bootstrap/app';
import knex from '../knex-export';
import envs from '../envs';

let server: Server;

before(async () => {
  await knex.migrate.latest();
  await knex.seed.run();

  server = await http.createServer(app);
  server.listen(envs.PORT);
});

after(async () => {
  await server.close();

  await knex.migrate.rollback();
});
