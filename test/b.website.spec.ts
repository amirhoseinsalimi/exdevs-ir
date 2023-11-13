/* tslint:disable */

import { JSDOM } from 'jsdom';
import * as supertest from 'supertest';
import { expect } from 'chai';

import app from '../bootstrap/app';

describe('Website', () => {
  it('should get the index page', async () => {
    const { text } = await supertest(app).get('/').expect(200);

    const { document } = new JSDOM(text).window;
    const headline = document.querySelector(
      '.headline .headline__header.shining',
    )?.textContent;

    expect(headline).equals('Exceptional Developers');
  });

  it('should get the admin login page', async () => {
    const { text } = await supertest(app).get('/admin').expect(200);

    const { document } = new JSDOM(text).window;
    const copyrightNotice = document.querySelector('.copyright-notice')
      ?.textContent;

    expect(copyrightNotice).equals(`Copyright © ${new Date().getFullYear()}`);
  });
});
