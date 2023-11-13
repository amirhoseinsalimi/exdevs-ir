import { Knex } from 'knex';

const TABLE_NAME = 'team';

export const up = async (knex: Knex) => {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (exists) {
    return;
  }

  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex) => {
  const exists = knex.schema.hasTable(TABLE_NAME);

  if (!exists) {
    return;
  }

  await knex.schema.dropTableIfExists(TABLE_NAME);
};

export const config = { transaction: false };
