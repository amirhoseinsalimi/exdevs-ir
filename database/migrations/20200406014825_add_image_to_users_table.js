
exports.up = (knex) => {
  knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.table('users', (table) => {
        table.string('photo');
      });
    }
  });
};

exports.down = (knex) => {
  knex.schema.hasTable('users').then((exists) => {
    if (exists) {
      return knex.schema.dropColumn('photo');
    }
  });
};
