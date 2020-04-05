exports.up = (knex) => {
  knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.increments().primary();
        table.string('full_name').notNullable();
        table.string('role').notNullable();
        table.text('description').notNullable();
        table.string('photo').notNullable();
        table.string('telegram').notNullable();
        table.string('email').notNullable();
        table.string('twitter').notNullable();
        table.string('linkedin').notNullable();
        table.string('github').notNullable();
        table.timestamps();
      });
    }
  });
};

exports.down = (knex) => {
  knex.schema.hasTable('users').then((exists) => {
    if (exists) {
      return knex.schema.dropTableIfExists('users');
    }
  });
};
