const db = require('../data/dbConfig.js')
const tbname = 'class'
module.exports = {
    add,
    findById,
    findBy,
    update,
    remove
}

async function add(newUserCredentials) {
        try {
            const [classId] = await db(tbname).insert(newUserCredentials, 'classId')
            return await findById(classId)
        } catch (error) {
            throw error
        }
}

async function findById(classId) {
    return await db(tbname).where({classId: classId}).first()
}

async function findBy(filter, target) {
    return await db(tbname).where(filter, target)
}

async function update({updates, classId}) {
    try {
        for (const iterator of Object.keys(updates)) {
         await db(tbname).where('classId', classId).update({[iterator]: updates[iterator]})
       }
       return await findById(classId);
     } catch (error) {
       return error
     }
}

async function remove(classId) {
    try {
        return await db(tbname).where('classId', classId).del()
      } catch (error) {
        throw error
      }
}