const { exists } = require('fs');
const { promisify } = require('util');
const supertest = require('supertest');
const expect = require('chai').expect;

const app = require('../app');
const knex = require('../knex-export');
const {
  ADMIN_USERNAME: adminUsername,
  ADMIN_PASSWORD: adminPassword,
} = require('../env');

const existsAsync = promisify(exists);

describe('API', () => {
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
  const testColor = '#f1f1f1';

  describe('Admin Authentication', () => {
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

    it('should reject restricted routes without admin cookie set', async () => {
      let text;

      ({ res: { text } } = await supertest(app).get('/api/message').expect(302));
      expect(text).equals('Found. Redirecting to /admin');

      ({ res: { text } } = await supertest(app).get('/api/message/1').expect(302));
      expect(text).equals('Found. Redirecting to /admin');

      ({ res: { text } } = await supertest(app).put('/api/message/1').expect(302));
      expect(text).equals('Found. Redirecting to /admin');

      ({ res: { text } } = await supertest(app).delete('/api/message/1').expect(302));
      expect(text).equals('Found. Redirecting to /admin');

      ({ res: { text } } = await supertest(app).post('/api/member').expect(302));
      expect(text).equals('Found. Redirecting to /admin');

      ({ res: { text } } = await supertest(app).put('/api/member/1').expect(302));
      expect(text).equals('Found. Redirecting to /admin');

      ({ res: { text } } = await supertest(app).delete('/api/member/1').expect(302));
      expect(text).equals('Found. Redirecting to /admin');

      ({ res: { text } } = await supertest(app).post('/api/team').expect(302));
      expect(text).equals('Found. Redirecting to /admin');

      ({ res: { text } } = await supertest(app).put('/api/team/1').expect(302));
      expect(text).equals('Found. Redirecting to /admin');

      ({ res: { text } } = await supertest(app).delete('/api/team/1').expect(302));
      expect(text).equals('Found. Redirecting to /admin');
    });
  });

  describe('Messages API', () => {
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

      const { name, email, message } = await knex
        .select('*')
        .from('messages')
        .first();

      expect(name).equals(testName);
      expect(email).equals(testEmail);
      expect(message).equals(testMessage);
    });

    it('should fetch the list of all messages', async () => {
      const requestWithCookie = supertest(app).get('/api/message');

      requestWithCookie.cookies = adminCookie;

      const { body: messages } = await requestWithCookie.expect(200);

      expect(messages).to.be.an('array').and.to.have.lengthOf(1);
      expect(messages.pop())
        .to.be.an('object')
        .and.to.include.keys('name', 'email', 'message', 'is_read');
    });

    it('should get a message by its id', async () => {
      const requestWithCookie = supertest(app).get('/api/message/1');

      requestWithCookie.cookies = adminCookie;

      const { body: message } = await requestWithCookie.expect(200);

      expect(message.pop())
        .to.be.an('object')
        .and.to.include.keys('name', 'email', 'message', 'is_read');
    });

    it('should mark message as read by its id', async () => {
      const requestWithCookie = supertest(app).put('/api/message/1');

      requestWithCookie.cookies = adminCookie;

      await requestWithCookie.expect(204);

      const { is_read: isRead } = await knex.select('*').from('messages').first();

      expect(isRead).equals(1);
    });

    it('should delete message by its id', async () => {
      const requestWithCookie = supertest(app).delete('/api/message/1');

      requestWithCookie.cookies = adminCookie;

      await requestWithCookie.expect(204);

      const { length } = await knex.select('*').from('messages');

      expect(length).equals(0);
    });
  });

  describe('Members API', () => {
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
        .attach('photo', 'resources/img/mug.png')
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

    it('should fetch the list of all members', async () => {
      const { body: members } = await supertest(app)
        .get('/api/member')
        .expect(200);

      expect(members).to.be.an('array').and.to.have.lengthOf(1);
      expect(members.pop())
        .to.be.an('object')
        .and.to.include.keys(
          'full_name',
          'role',
          'description',
          'photo',
          'telegram',
          'email',
          'twitter',
          'linkedin',
          'github',
        );
    });

    it('should get a member by its id', async () => {
      const { body } = await supertest(app).get('/api/member/1').expect(200);

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
      } = body[0];

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

    it('should update member', async () => {
      const requestWithCookie = supertest(app).put('/api/member/1');

      requestWithCookie.cookies = adminCookie;

      await requestWithCookie
        .type('form')
        .send({
          full_name: `New_${testName}`,
          email: `New_${testEmail}`,
          role: `New_${testRole}`,
          telegram: `New_${testTelegram}`,
          github: `New_${testGithub}`,
          linkedin: `New_${testLinkedIn}`,
          twitter: `New_${testTwitter}`,
          description: `New_${testDescription}`,
        })
        .expect(204);

      const {
        full_name: newFullName,
        email: newEmail,
        role: newRole,
        telegram: newTelegram,
        github: newGithub,
        linkedin: newLinkedIn,
        twitter: newTwitter,
        description: newDescription,
      } = await knex.select('*').from('members').first();

      expect(newFullName).equals(`New_${testName}`);
      expect(newEmail).equals(`New_${testEmail}`);
      expect(newRole).equals(`New_${testRole}`);
      expect(newTelegram).equals(`New_${testTelegram}`);
      expect(newGithub).equals(`New_${testGithub}`);
      expect(newLinkedIn).equals(`New_${testLinkedIn}`);
      expect(newTwitter).equals(`New_${testTwitter}`);
      expect(newDescription).equals(`New_${testDescription}`);
    });

    it('should delete member by its id', async () => {
      const requestWithCookie = supertest(app).delete('/api/member/1');

      requestWithCookie.cookies = adminCookie;

      await requestWithCookie.expect(204);

      const { length } = await knex.select('*').from('members');

      expect(length).equals(0);
    });
  });

  describe('Teams API', () => {
    it('should create a team', async () => {
      const { length: oldL } = await knex.select('*').from('teams');

      const requestWithCookie = supertest(app).post('/api/team');

      requestWithCookie.cookies = adminCookie;

      await requestWithCookie
        .type('form')
        .send({
          name: testName,
          description: testDescription,
          color: testColor,
        })
        .expect(302);

      const { length: newL } = await knex.select('*').from('teams');

      expect(newL).equals(oldL + 1);
    });

    it('should fetch the list of all teams', async () => {
      const {
        body: { teams },
      } = await supertest(app).get('/api/team').expect(200);

      expect(teams).to.be.an('array').and.to.have.lengthOf.above(1);
      expect(teams.pop())
        .to.be.an('object')
        .and.to.include.keys('name', 'description', 'color');
    });

    it('should get a team by its id', async () => {
      const { body: team } = await supertest(app).get('/api/team/1').expect(200);

      expect(team.pop())
        .to.be.an('object')
        .and.to.include.keys('name', 'description', 'color');
    });

    it('should update team', async () => {
      const requestWithCookie = supertest(app).put('/api/team/1');

      requestWithCookie.cookies = adminCookie;

      await requestWithCookie
        .type('form')
        .send({
          name: `New_${testName}`,
          description: `New_${testDescription}`,
          color: `New_${testColor}`,
        })
        .expect(204);

      const {
        name: newName,
        description: newDescription,
        color: newColor,
      } = await knex.select('*').from('teams').first();

      expect(newName).equals(`New_${testName}`);
      expect(newDescription).equals(`New_${testDescription}`);
      expect(newColor).equals(`New_${testColor}`);
    });

    it('should delete team by its id', async () => {
      const { length: oldL } = await knex.select('*').from('teams');

      const requestWithCookie = supertest(app).delete('/api/team/1');

      requestWithCookie.cookies = adminCookie;

      await requestWithCookie.expect(204);

      const { length: newL } = await knex.select('*').from('teams');

      expect(newL).equals(oldL - 1);
    });
  });
});
