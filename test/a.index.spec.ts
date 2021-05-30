/* tslint:disable */

const http = require('http');

const app = require('../bootstrap/app');
const knex = require('../knex-export');
const {
  PORT: port,
} = require('../env');

let server;

before(async () => {
  await knex.migrate.latest();
  await knex.seed.run();

  server = await http.createServer(app);
  server.listen(port);
});

after(async () => {
  await server.close();

  await knex.migrate.rollback();
});
