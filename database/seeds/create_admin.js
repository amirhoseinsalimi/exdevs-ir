const bcrypt = require('bcrypt');

const {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
} = require('../../env');

async function hashPassword(plainPassword) {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

exports.seed = knex =>
  // Deletes ALL existing entries
  knex('admins')
    .del()
    .then(async () =>
      // Inserts seed entries
      knex('admins').insert({
        username: ADMIN_USERNAME,
        password: await hashPassword(ADMIN_PASSWORD),
      }));
