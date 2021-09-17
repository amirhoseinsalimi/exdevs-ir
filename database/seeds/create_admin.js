const bcrypt = require('bcrypt');

const {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
} = require('../../env');

// TODO: Move this to a helper function
function hashPassword(plainPassword) {
  const saltRounds = 10;

  return bcrypt.hash(plainPassword, saltRounds);
}

exports.seed = async (knex) => {
  await knex('admins').del();
  const password = await hashPassword(ADMIN_PASSWORD);

  await knex('admins').insert({
    username: ADMIN_USERNAME,
    password,
  });
};
