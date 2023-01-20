import { Knex } from 'knex';

const TABLE_NAME = 'teams';
const COLUMN_NAME = 'color';

export const up = async (knex: Knex) => {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (!exists) {
    return;
  }

  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME).after('description').nullable();
  });
};

export const down = async (knex: Knex) => {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (!exists) {
    return;
  }

  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
};

export const config = { transaction: false };
