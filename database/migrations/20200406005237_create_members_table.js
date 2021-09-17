const TABLE_NAME = 'members';

exports.up = async (knex) => {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (exists) {
    return;
  }

  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments().primary();
    table.string('full_name').notNullable();
    table.string('role').notNullable();
    table.text('description').notNullable();
    table.string('photo').notNullable();
    table.string('telegram').nullable();
    table.string('email').nullable();
    table.string('twitter').nullable();
    table.string('linkedin').nullable();
    table.string('github').nullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  const exists = await knex.schema.hasTable(TABLE_NAME);

  if (!exists) {
    return;
  }

  await knex.schema.dropTableIfExists(TABLE_NAME);
};

exports.config = { transaction: false };
