exports.up = async (knex) => {
  const exists = await knex.schema.hasTable('messages');

  if (exists) {
    return;
  }

  await knex.schema.createTable('messages', (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.text('message').notNullable();
    table.boolean('is_read').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  const exists = await knex.schema.hasTable('messages');

  if (!exists) {
    return;
  }

  await knex.schema.dropTableIfExists('messages');
};

exports.config = { transaction: false };
