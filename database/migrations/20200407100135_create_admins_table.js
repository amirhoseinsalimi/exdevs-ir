exports.up = async (knex) => {
  const exists = await knex.schema
    .hasTable('admins');

  if (exists) {
    return;
  }

  await knex.schema.createTable('admins', (table) => {
    table.increments().primary();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  const exists = await knex.schema.hasTable('admins');

  if (!exists) {
    return;
  }

  await knex.schema.dropTableIfExists('admins');
};

exports.config = { transaction: false };
