exports.up = function(knex) {
  const hrEnu = [1,2,3,4,5,6,7,8,9,10,11,12];
  const hrPer = ['AM', 'PM']
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
    table.enu('startHper', hrPer).notNullable()
    table.enu('end', hrEnu).notNullable()
    table.enu('endHper', hrPer).notNullable()
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
  .createTable('event', table => {
      //prymary
      table.increments('eventId')
      //foreign
      table.integer('classId').references('class.classId').unsigned().notNullable().onDelete('CASCADE')
      table.integer('userId').references('userData.userId').unsigned().notNullable().onDelete('CASCADE')

  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('event')
  .dropTableIfExists('hours')
  .dropTableIfExists('class')
};
