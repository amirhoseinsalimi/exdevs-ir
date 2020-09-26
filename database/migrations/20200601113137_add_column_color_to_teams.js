exports.up = knex =>
  knex.schema
    .hasTable('teams')
    .then(exists => {
      if (exists) {
        return knex.schema.alterTable('teams', (table) => {
          table.string('color').after('description').nullable();
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });

exports.down = knex =>
  knex.schema
    .hasTable('teams')
    .then(exists => {
      if (exists) {
        return knex.schema.alterTable('teams', (table) => {
          table.dropColumn('color');
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });

exports.config = { transaction: false };
