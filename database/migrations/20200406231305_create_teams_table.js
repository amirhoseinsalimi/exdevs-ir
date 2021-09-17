const TABLE_NAME = 'teams';

exports.up = async (knex) => {
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

exports.down = async (knex) => {
  const exists = knex.schema.hasTable(TABLE_NAME);

  if (!exists) {
    return;
  }

  await knex.schema.dropTableIfExists(TABLE_NAME);
};

exports.config = { transaction: false };
