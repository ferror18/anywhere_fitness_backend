const tbname = 'userCredentials'
const { genericModel: {
  genFindAll,
  genFindBy,
  genAdd,
  genFindById,
  genUpdate,
  genRemove
} } = require("../userUtilities")



async function findAll() {
  return await genFindAll(tbname);
}
async function findBy(filter) {
  try {
    return await genFindBy(filter, tbname)
  } catch (error) {
    return error
  }
}

async function add(user) {
  try {
    const newUser = await genAdd(user, tbname);
    return await newUser
  } catch (error) {
    return error
  }
}

async function findById(id) {
  return await genFindById(id, tbname)
}

async function update(info) {
  return await genUpdate({...info, tbname})
}

async function remove(id) {
  return await genRemove(id,tbname);
}


module.exports = {
  add,
  findAll,
  findBy,
  findById,
  update,
  remove
};