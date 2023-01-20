const { ADMIN_USERNAME, ADMIN_PASSWORD } = require('../../env');
const { hashPassword } = require('../../app/helpers/hash.ts');

const TABLE_NAME = 'admins';

exports.seed = async (knex) => {
  await knex(TABLE_NAME).del();
  const password = await hashPassword(ADMIN_PASSWORD);

  await knex(TABLE_NAME).insert({
    username: ADMIN_USERNAME,
    password,
  });
};
