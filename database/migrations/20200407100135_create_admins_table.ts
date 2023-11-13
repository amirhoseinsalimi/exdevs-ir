import { Knex } from 'knex';

const TABLE_NAME = 'admin';

export const up = async (knex: Knex) => {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (exists) {
    return;
  }

  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments().primary();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex) => {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (!exists) {
    return;
  }

  await knex.schema.dropTableIfExists(TABLE_NAME);
};

export const config = { transaction: false };
