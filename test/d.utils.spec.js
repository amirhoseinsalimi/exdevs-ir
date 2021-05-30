const expect = require('chai').expect;

const { generateSecretKey } = require('../utils/gen-secret');

describe('Utils', () => {
  it('should generate a random string w/ specified length', done => {
    const randomNumber = Math.floor(Math.random() * 100) + 10;

    expect(generateSecretKey(randomNumber))
      .to.be.a('string')
      .and.with.lengthOf(randomNumber);

    done();
  });
});