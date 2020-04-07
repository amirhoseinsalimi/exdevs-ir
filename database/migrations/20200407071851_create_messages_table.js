exports.up = async (knex) => {
  knex.schema
    .hasTable('messages')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('messages', (table) => {
          table.increments().primary();
          table.string('name').notNullable();
          table.string('email').notNullable();
          table.text('message').notNullable();
          table.boolean('is_read').notNullable().defaultTo(false);
          table.timestamps(true, true);
        });
      }
    })
    .catch(() => {});
};

exports.down = async (knex) => {
  knex.schema
    .hasTable('messages')
    .then((exists) => {
      if (exists) {
        return knex.schema.dropTableIfExists('messages');
      }
    })
    .catch(() => {});
};

exports.config = { transaction: false };
