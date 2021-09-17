exports.up = async (knex) => {
  const exists = await knex.schema.hasTable('teams');

  if (exists) {
    return;
  }

  await knex.schema.createTable('teams', (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  const exists = knex.schema.hasTable('teams');

  if (!exists) {
    return;
  }

  await knex.schema.dropTableIfExists('teams');
};

exports.config = { transaction: false };
