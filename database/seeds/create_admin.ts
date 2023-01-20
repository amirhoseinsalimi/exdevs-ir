import envs from '../../envs';
import { hashPassword } from '../../app/helpers/hash';

const TABLE_NAME = 'admins';

// eslint-disable-next-line import/prefer-default-export
export const seed = async (knex: any) => {
  await knex(TABLE_NAME).del();
  const password = await hashPassword(envs.ADMIN_PASSWORD);

  await knex(TABLE_NAME).insert({
    username: envs.ADMIN_USERNAME,
    password,
  });
};
