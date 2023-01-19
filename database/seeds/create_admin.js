const bcrypt = require('bcrypt');

const {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
} = require('../../env');

const TABLE_NAME = 'admins';

// TODO: Move this to a helper function
function hashPassword(plainPassword) {
  const saltRounds = 10;

  return bcrypt.hash(plainPassword, saltRounds);
}

exports.seed = async (knex) => {
  await knex(TABLE_NAME).del();
  const password = await hashPassword(ADMIN_PASSWORD);

  await knex(TABLE_NAME).insert({
    username: ADMIN_USERNAME,
    password,
  });
};
