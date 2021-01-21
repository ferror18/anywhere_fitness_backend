const { isValidUser } = require('./instructorServices')
const db = require('../data/dbConfig.js')
const dbname = 'instructor'
module.exports = {
    add,
    findById,
    findBy,
    update,
    remove
}

async function add(newInstructor) {
    if (isValidUser(newInstructor)) {
        try {
            const [instructor_id] = await db(dbname).insert(newInstructor, 'instructor_id')
            return await findById(instructor_id)
        } catch (error) {
            throw error
        }
    } else {
        return 'Invalid id'
    }
}

async function findById(instructor_id) {
    return await db(dbname).where({instructor_id: instructor_id}).first()
}

async function findBy(filter, target) {
    return await db(dbname).where(filter, target)
}

async function update({updates, instructor_id}) {
    try {
        for (const iterator of Object.keys(updates)) {
         await db(dbname).where('instructor_id', '=', instructor_id).update({[iterator]: updates[iterator]})
       }
       return await findById(instructor_id);
     } catch (error) {
       console.log(updates, instructor_id, dbname);
       return error
     }
}

async function remove(instructor_id) {
    try {
        return await db(dbname).where('instructor_id', instructor_id).del()
      } catch (error) {
        throw error
      }
}