exports.up = (knex) => {
  knex.schema.hasTable('teams').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('teams', (table) => {
        table.increments().primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.timestamps();
      });
    }
  });
};

exports.down = (knex) => {
  knex.schema.hasTable('teams').then((exists) => {
    if (exists) {
      return knex.schema.dropTableIfExists('teams');
    }
  });
};
