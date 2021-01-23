const db = require('../data/dbConfig.js')
const tbname = 'event'
module.exports = {
    add,
    findById,
    findBy,
    update,
    remove
}

async function add(newUserCredentials) {
        try {
            const [eventId] = await db(tbname).insert(newUserCredentials, 'eventId')
            return await findById(eventId)
        } catch (error) {
            throw error
        }
}

async function findById(eventId) {
    const result = await db(tbname)
    .innerJoin('userCredentials', 'userCredentials.userId', 'event.userId')
    .innerJoin('class', 'class.classId', 'event.classId')
    .select('event.eventId', 
    'event.created_at as event_created_at', 
    'event.updated_at as event_updated_at',
    'userCredentials.userId', 
    'class.classId',
    'userCredentials.email', 
    'class.*',)
    .where('eventId', eventId)
    .first()
      return {
        "eventId": result.eventId,
        "event_created_at": result.event_created_at,
        "event_updated_at": result.event_updated_at,
        user: {
          "userId": result.userId,
         "classId": result.classId
        },
        class: {
          "email": result.email,
          "title": result.title,
          "description": result.description,
          "start": result.start,
          "startHper": result.startHper,
          "end": result.end,
          "endHper": result.endHper,
          "owner": result.owner,
          "enrolled": result.enrolled,
          "lat": result.lat,
          "lon": result.lon,
          "cost": result.cost,
          "imageUrl": result.imageUrl,
          "created_at": result.created_at,
          "updated_at": result.updated_at
      }
      }
}

async function findBy(filter, target) {
    return await db(tbname).where(filter, target)
}

async function update({updates, eventId}) {
    try {
        for (const iterator of Object.keys(updates)) {
         await db(tbname).where('eventId', eventId).update({[iterator]: updates[iterator]})
       }
       return await findById(eventId);
     } catch (error) {
       return error
     }
}

async function remove(eventId) {
    try {
        return await db(tbname).where('eventId', eventId).del()
      } catch (error) {
        throw error
      }
}