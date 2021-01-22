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
    return await db(tbname).where({eventId: eventId}).first()
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