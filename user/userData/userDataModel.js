const db = require('../../data/dbConfig.js')
const tbname = 'userData'
module.exports = {
    add,
    findById,
    findBy,
    update,
    remove
}

async function add(newUserCredentials) {
        try {
            const [userId] = await db(tbname).insert(newUserCredentials, 'userId')
            return await findById(userId)
        } catch (error) {
            throw error
        }
}

async function findById(userId) {
    return await db(tbname).where({userId: userId}).first()
}

async function findBy(filter, target) {
    return await db(tbname).where(filter, target)
}

async function update({updates, userId}) {
    try {
        for (const iterator of Object.keys(updates)) {
         await db(tbname).where('userId', userId).update({[iterator]: updates[iterator]})
       }
       return await findById(userId);
     } catch (error) {
       return error
     }
}

async function remove(userId) {
    try {
        return await db(tbname).where('userId', userId).del()
      } catch (error) {
        throw error
      }
}