const http = require('http');
const { exec } = require('child_process');
const { promisify } = require('util');
const { JSDOM } = require('jsdom');
const supertest = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

const {
  PORT: port,
} = require('../env');

const execAsync = promisify(exec);
let server;

describe('Website', () => {
  before(async () => {
    await execAsync('cross-env NODE_ENV=testing knex migrate:latest');
    await execAsync('cross-env NODE_ENV=testing knex seed:run');

    server = await http.createServer(app);
    server.listen(port);
  });

  after(async () => {
    await server.close();

    await execAsync('cross-env NODE_ENV=testing knex migrate:rollback');
  });

  it('should get the index page', async () => {
    const { text } = await supertest(app).get('/').expect(200);

    const { document } = new JSDOM(text).window;
    const headline = document.querySelector('.headline .headline__header.shining').textContent;
    expect(headline).to.be.equal('Exceptional Developers');
  });

  it('should get the admin login page', async () => {
    const { text } = await supertest(app).get('/admin').expect(200);

    const { document } = new JSDOM(text).window;
    const copyrightNotice = document.querySelector('.copyright-notice').textContent;
    expect(copyrightNotice).to.be.equal(`Copyright © ${new Date().getFullYear()}`);
  });
});
