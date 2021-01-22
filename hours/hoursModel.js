const db = require('../data/dbConfig.js')
const tbname = 'hours'
module.exports = {
    add,
    findById,
    findBy,
    update,
    remove
}

async function add(newUserCredentials) {
        try {
            const [hoursId] = await db(tbname).insert(newUserCredentials, 'hoursId')
            return await findById(hoursId)
        } catch (error) {
            throw error
        }
}

async function findById(hoursId) {
    return await db(tbname).where({hoursId: hoursId}).first()
}

async function findBy(filter, target) {
    return await db(tbname).where(filter, target)
}

async function update({updates, hoursId}) {
    try {
        for (const iterator of Object.keys(updates)) {
         await db(tbname).where('hoursId', hoursId).update({[iterator]: updates[iterator]})
       }
       return await findById(hoursId);
     } catch (error) {
       return error
     }
}

async function remove(hoursId) {
    try {
        return await db(tbname).where('hoursId', hoursId).del()
      } catch (error) {
        throw error
      }
}