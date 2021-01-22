
exports.up = function(knex) {
  return knex.schema.createTable('userCredentials', (table) => {
      table.increments('userId')
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('userCredentials')
};
