
exports.up = function(knex) {
  return knex.schema.createTable('userData', (table) => {
      table.integer('userId').references('userCredentials.userId').unsigned().primary().notNullable().onDelete('CASCADE')
      table.string('firstName').notNullable()
      table.string('lastName').notNullable()
      table.string('displayedName').notNullable()
      table.date('dob').nullable()
      table.text('bio').nullable()
      table.string('imageUrl').defaultTo('https://picsum.photos/400')
      table.string('phone', 14).notNullable()
      table.string('address').nullable()
      table.boolean('isInstructor').notNullable()
      table.timestamps(true, true)

  })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('userData')
};
