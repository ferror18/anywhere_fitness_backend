const { isValidUser } = require('./studentServices')
const db = require('../data/dbConfig.js')
const dbname = 'student'
module.exports = {
    add,
    findById,
    findBy,
    update,
    remove
}

async function add(newStudent) {
    if (isValidUser(newStudent)) {
        try {
            const [student_id] = await db(dbname).insert(newStudent, 'student_id')
            return await findById(student_id)
        } catch (error) {
            throw error
        }
    } else {
        return 'Invalid id'
    }
}

async function findById(student_id) {
    return await db(dbname).where({student_id: student_id}).first()
}

async function findBy(filter, target) {
    return await db(dbname).where(filter, target)
}

async function update({updates, student_id}) {
    try {
        for (const iterator of Object.keys(updates)) {
         await db(dbname).where('student_id', '=', student_id).update({[iterator]: updates[iterator]})
       }
       return await findById(student_id);
     } catch (error) {
       console.log(updates, student_id, dbname);
       return error
     }
}

async function remove(student_id) {
    try {
        return await db(dbname).where('student_id', student_id).del()
      } catch (error) {
        throw error
      }
}