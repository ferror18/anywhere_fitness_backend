const bcryptjs = require("bcryptjs");
const userData = require('../user/userData/userDataModel')
const Class = require('./classModel')

module.exports.isValidForPost = async function (credentials) {
  let missingField = false
  // credentials.owner = Number(credentials.owner)
  const requiredFields = [
    "title",
    "description",
    "owner",
  ]
  if (credentials === null || credentials === undefined) {
      return [ 400, "No data sent" ]
  }
  for (let i = 0; i < requiredFields.length; i++) {
        if (credentials[requiredFields[i]] === undefined) {
          missingField = requiredFields[i]
          break 
        }
  }
  if (missingField) {
      return [ 400, `Missing required field:'${missingField}' `]
  }if (!Number.isInteger(credentials.owner) || !Number.isSafeInteger(credentials.owner)) {
    return [400, "Owner key is not an integer"]
  }
  const userDataFromdb = await userData.findById(credentials.owner)
  if (!userDataFromdb) {
    return [400, "Owner does not exist"]
  } else {
      return [ 200, "success"]
  }
}

  module.exports.isValidForGet = async function (credentials) {
  if (credentials === null || credentials === undefined) {
    return [ 400, 'No classId provided']
  }if (!Number.isInteger(credentials) || !Number.isSafeInteger(credentials)) {
    return [ 400, 'ClassId is not a valid Integer']
  }
  const cls = await Class.findById(credentials)
  if (!cls) {
    return [ 400, 'Class does not exist, wrong Id']
  } else {
    return [ 200, 'Succes']
  }
}

module.exports.isValidForPatch = async function (credentials, userId) {
  if (credentials === null || credentials === undefined || (Object.keys(credentials).length === 0 && credentials.constructor === Object)) {
    return [ 400, "No changes requested" ]
  } if (userId === null || userId === undefined) {
    return [ 400, "No userId provided" ]
  }if (!Number.isInteger(userId) || !Number.isSafeInteger(userId)) {
    return [ 400, "userId is not a valid integer" ]
  }
  const user = await userData.findById(userId);
  if (!user) {
    return [ 400, "User does not exist"]
  } else {
    return [ 200, "Update succesfull"];
  }
}


module.exports.isValidForDelete = async function (credentials) {
  if (credentials === null || credentials === undefined) {
    return [ 400, "classId is required to delete class" ]
  } if (!Number.isInteger(credentials) || !Number.isSafeInteger(credentials)) {
    return [ 400, "Invalid format" ]
  } 
  const cls = await Class.findById(credentials);
  if (!cls) {
    return [ 400, "Class does not exist"]
  }else {
    return [ 200, credentials];
  }
}