exports.up = function(knex) {
  const hrEnu = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  const mnEnu = [
    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
   12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
   24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
   36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
   48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
 ]
  const dayEnu = [0,1,2,3,4,5,6]
  return knex.schema
  .createTable('class', table => {
    //primary
    table.increments('classId')
    //Required
    table.string('title').notNullable()
    table.text('description').notNullable()
    //Day of week starting monday = 1
    table.enu('day', dayEnu).notNullable()
    //times
    table.enu('start', hrEnu).notNullable()
    table.enu('startM', mnEnu).notNullable()
    table.enu('end', hrEnu).notNullable()
    table.enu('endM', mnEnu).notNullable()
    //Foreign
    table.integer('owner').references('userData.userId').unsigned().notNullable().onDelete('CASCADE')
    //Else
    table.integer('enrolled').defaultTo(0)
    table.decimal('lat', 8, 6)
    table.decimal('lon', 9, 6)
    table.decimal('cost', 5, 2).defaultTo(0)
    table.string('imageUrl').defaultTo('https://picsum.photos/1200/600')
    table.timestamps(true, true)    
  })
  .createTable('event', table => {
      //prymary
      table.increments('eventId')
      //foreign
      table.integer('classId').references('class.classId').unsigned().notNullable().onDelete('CASCADE')
      table.integer('userId').references('userData.userId').unsigned().notNullable().onDelete('CASCADE')
      //Else
      table.timestamps(true, true)

  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('event')
  .dropTableIfExists('hours')
  .dropTableIfExists('class')
};
