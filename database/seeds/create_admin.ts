import envs from '../../envs';
import { hashPassword } from '../../app/helpers/hash';
import { Knex } from 'knex';

const TABLE_NAME = 'admin';

export const seed = async (knex: Knex) => {
  await knex(TABLE_NAME).del();
  const password = await hashPassword(envs.ADMIN_PASSWORD);

  await knex(TABLE_NAME).insert({
    username: envs.ADMIN_USERNAME,
    password,
  });
};
