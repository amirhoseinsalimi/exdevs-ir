const TABLE_NAME = 'teams';
const COLUMN_NAME = 'color';

exports.up = async (knex) => {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (!exists) {
    return;
  }

  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME).after('description').nullable();
  });
};

exports.down = async (knex) => {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (!exists) {
    return;
  }

  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
};

exports.config = { transaction: false };
