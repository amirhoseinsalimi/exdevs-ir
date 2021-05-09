const http = require('http');
const { exists } = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');
const { JSDOM } = require('jsdom');
const supertest = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../knex-export');

const {
  PORT: port,
  ADMIN_USERNAME: adminUsername,
  ADMIN_PASSWORD: adminPassword,
} = require('../env');

const execAsync = promisify(exec);
const existsAsync = promisify(exists);

describe('Website', () => {
  let server;
  let adminCookie;

  const testName = 'Test T. Test';
  const testEmail = 'test@test.com';
  const testRole = 'Test Developer';
  const testDescription = 'Lorem ipsum description';
  const testTwitter = 'test-twitter';
  const testTelegram = 'test-telegram';
  const testGithub = 'test-github';
  const testLinkedIn = 'test-linked-in';
  const testMessage = 'Hello, this is a test.';

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
    expect(headline).equals('Exceptional Developers');
  });

  it('should get the admin login page', async () => {
    const { text } = await supertest(app).get('/admin').expect(200);

    const { document } = new JSDOM(text).window;
    const copyrightNotice = document.querySelector('.copyright-notice').textContent;
    expect(copyrightNotice).equals(`Copyright © ${new Date().getFullYear()}`);
  });

  it('should store contact form messages', async () => {
    await supertest(app)
      .post('/api/message')
      .type('form')
      .send({
        name: testName,
        email: testEmail,
        message: testMessage,
      })
      .expect(302);

    const { name, email, message } = await knex.select('*').from('messages').first();

    expect(name).equals(testName);
    expect(email).equals(testEmail);
    expect(message).equals(testMessage);
  });

  it('should login the admin with specified credentials and get a cookie', async () => {
    const { headers } = await supertest(app)
      .post('/admin')
      .type('form')
      .send({
        user: adminUsername,
        password: adminPassword,
      })
      .expect(302);

    adminCookie = headers['set-cookie'].pop().split(';')[0];

    expect(adminCookie.length).to.greaterThan(1);
  });

  it('should mark messages as read', async () => {
    const requestWithCookie = supertest(app).put('/api/message/1');

    requestWithCookie.cookies = adminCookie;

    await requestWithCookie.expect(204);

    const { is_read: isRead } = await knex.select('*').from('messages').first();

    expect(isRead).equals(1);
  });

  it('should create a member', async () => {
    const requestWithCookie = supertest(app).post('/api/member');

    requestWithCookie.cookies = adminCookie;

    await requestWithCookie
      .field('full_name', testName)
      .field('email', testEmail)
      .field('role', testRole)
      .field('twitter', testTwitter)
      .field('telegram', testTelegram)
      .field('github', testGithub)
      .field('linkedin', testLinkedIn)
      .field('description', testDescription)
      .attach('photo', 'src/img/mug.png')
      .expect(302);

    const {
      full_name: fullName,
      email,
      role,
      twitter,
      telegram,
      github,
      linkedin,
      photo,
      description,
    } = await knex.select('*').from('members').first();

    expect(fullName).equals(testName);
    expect(email).equals(testEmail);
    expect(role).equals(testRole);
    expect(twitter).equals(testTwitter);
    expect(telegram).equals(testTelegram);
    expect(github).equals(testGithub);
    expect(linkedin).equals(testLinkedIn);
    expect(description).equals(description);

    expect(await existsAsync(photo)).equals(true);
  });

  it('should delete messages', async () => {
    const requestWithCookie = supertest(app).delete('/api/message/1');

    requestWithCookie.cookies = adminCookie;

    await requestWithCookie.expect(204);

    const { length } = await knex.select('*').from('messages');

    expect(length).equals(0);
  });

  it('should delete member', async () => {
    const requestWithCookie = supertest(app).delete('/api/member/1');

    requestWithCookie.cookies = adminCookie;

    await requestWithCookie.expect(204);

    const { length } = await knex.select('*').from('members');

    expect(length).equals(0);
  });

  // it('should fetch content (teams and members)', async () => {
  //   const { body } = await supertest(app)
  //     .get('/get-content')
  //     .expect(200);
  //
  //   console.log(body);
  // });
});
