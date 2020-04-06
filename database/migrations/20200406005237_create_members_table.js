exports.up = async (knex) => {
  knex.schema
    .hasTable('members')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('members', (table) => {
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
      }
    })
    .catch(() => {});
};

exports.down = async (knex) => {
  knex.schema
    .hasTable('members')
    .then((exists) => {
      if (exists) {
        return knex.schema.dropTableIfExists('members');
      }
    })
    .catch(() => {});
};

exports.config = { transaction: false };
