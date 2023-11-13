import { Knex } from 'knex';

const TABLE_NAME = 'message';

export const up = async (knex: Knex) => {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (exists) {
    return;
  }

  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.text('message').notNullable();
    table.boolean('is_read').notNullable().defaultTo(false);
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
