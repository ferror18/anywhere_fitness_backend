const db = require("../data/dbConfig");

module.exports = {
  add,
  findBy,
  findById,
  update,
  remove
};

async function findBy(filter) {
  try {
    return await db('user').where(filter).orderBy("id");
  } catch (error) {
    return error
  }
}

async function add(user) {
    try {
        const [id] = await db('user').insert(user, "id");
        const newUser =  await findById(id);
        return await newUser
      } catch (error) {
        throw error;
      }
}

async function findById(id) {
    return await db('user').where({ id }).first();
}

async function update({updates, id}) {
    try {
        for (const iterator of Object.keys(updates)) {
         await db('user').where('id', '=', id).update({[iterator]: updates[iterator]})
       }
       return await findById(id);
     } catch (error) {
       return error
     }
}

async function remove(id) {
    try {
        return await db('user').where({ id }).del()
      } catch (error) {
        throw error
      }
}