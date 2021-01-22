
exports.up = function(knex) {
  return knex.schema
  .createTable('class', table => {
    //primary
    table.increments('classId')
    //Required
    table.string('title').notNullable()
    table.text('description').notNullable()
    //Foreign
    table.integer('owner').references('userData.userId').unsigned().notNullable().onDelete('CASCADE')
    //Else
    table.integer('enrolled').defaultTo(0)
    table.decimal('lat', 8, 6)
    table.decimal('lon', 9, 7)
    table.decimal('cost', 5, 2).defaultTo(0)
    table.string('imageUrl').defaultTo('https://picsum.photos/1200/600')
    table.timestamps(true, true)    
  })
  .createTable('classHours', table => {
      // primary fooreign to class
      table.integer('hoursId').references('class.classId').unsigned().primary().notNullable().onDelete('CASCADE')
      //Day of week starting monday = 1
      table.enu('day', [1,2,3,4,5,6,7]).notNullable()
      //times
      table.time('start').notNullable()
      table.time('end').notNullable()
  })
  .createTable('classUser', table => {
      //prymary
      table.increments('eventId')
      //foreign
      table.integer('classId').references('class.classId').unsigned().notNullable().onDelete('CASCADE')
      table.integer('userId').references('userData.userId').unsigned().notNullable().onDelete('CASCADE')

  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('classUser')
  .dropTableIfExists('classHours')
  .dropTableIfExists('class')
};
