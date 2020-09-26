exports.up = knex =>
  knex.schema
    .hasTable('admins')
    .then(exists => {
      if (!exists) {
        return knex.schema.createTable('admins', table => {
          table.increments().primary();
          table.string('username').notNullable();
          table.string('password').notNullable();
          table.timestamps(true, true);
        });
      }
    })
    .catch(() => {});

exports.down = knex =>
  knex.schema
    .hasTable('admins')
    .then(exists => {
      if (exists) {
        return knex.schema.dropTableIfExists('admins');
      }
    })
    .catch(() => {});

exports.config = { transaction: false };
