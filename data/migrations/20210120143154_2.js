
exports.up = function(knex) {
  return knex.schema.createTable('student', (table) => {
      table.integer('student_id').references('user.id').unsigned().primary().notNullable().onDelete('CASCADE')
      table.string('firstName').notNullable()
      table.string('lastName').notNullable()
      table.string('displayedName').notNullable()
      table.date('dob').nullable()
      table.text('bio').nullable()
      table.string('imageUrl').defaultTo('https://picsum.photos/400')
      table.string('phone', 10).notNullable().unique()
      table.string('address').nullable()
      table.timestamps(true, true)

  })
  .createTable('instructor', (table) => {
      table.integer('instructor_id').references('user.id').unsigned().primary().notNullable().onDelete('CASCADE')
      table.string('firstName').notNullable()
      table.string('lastName').notNullable()
      table.string('displayedName').notNullable()
      table.date('dob').nullable()
      table.text('bio').nullable()
      table.string('imageUrl').defaultTo('https://picsum.photos/400')
      table.string('phone', 10).notNullable().unique()
      table.string('address').nullable()
      table.timestamps(true, true)
  })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('student')
    .dropTableIfExists('instructor')
};
