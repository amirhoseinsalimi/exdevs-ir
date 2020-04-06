exports.up = (knex) => {
  knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
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
