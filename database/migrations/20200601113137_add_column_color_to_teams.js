exports.up = async (knex) => {
  const exists = await knex.schema.hasTable('teams');

  if (!exists) {
    return;
  }

  await knex.schema.alterTable('teams', (table) => {
    table.string('color').after('description').nullable();
  });
};

exports.down = async (knex) => {
  const exists = await knex.schema.hasTable('teams');

  if (!exists) {
    return;
  }

  await knex.schema.alterTable('teams', (table) => {
    table.dropColumn('color');
  });
};

exports.config = { transaction: false };
