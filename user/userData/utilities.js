const bcryptjs = require("bcryptjs");
const userData = require('./userDataModel')
const userCred = require('../userCredentials/userCredentialsModel')

module.exports.isValidForPost = async function (credentials) {
  let missingField = false
  const requiredFields = [
    "userId",
    "firstName",
    "lastName",
    "displayedName",
    "phone",
    "address",
    "isInstructor"
  ]
  if (credentials === null || credentials === undefined) {
      return [ 400, "No data sent" ]
  }
  for (let i = 0; i < requiredFields.length; i++) {
        if (credentials[requiredFields[i]] === undefined) {
          console.log(!credentials[requiredFields[i]]);
          missingField = requiredFields[i]
          break 
        }
  }
  if (missingField) {
      return [ 400, `Missing required field:'${missingField}' `]
  }
  const userCredential = await userCred.findById(credentials.userId)
  if (!userCredential) {
    return [400, "User does not exist"]
  }
  const userDataFromdb = await userData.findById(credentials.userId)
  if (userDataFromdb) {
    return [400, "User already exists"]
  } else {
      return [ 200, "success"]
  }
}

  module.exports.isValidForGet = function (credentials) {
  if (credentials === null || credentials === undefined) {
    return false
  }if (!credentials.password) {
    return false
  } if (!credentials.email) {
    return false
  } if (typeof credentials.password  !== 'string' || typeof credentials.password  !== 'string') {
    return false
  } else {
    return true
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


module.exports.isValidForDelete = async function (credentials, userId) {
  if (credentials === null || credentials === undefined) {
    return [ 400, "Password is required to delete" ]
  } if (!credentials.password) {
    return [ 400, "Password is required to delete" ]
  } if (typeof credentials.password  !== 'string') {
    return [ 400, "Invalid format" ]
  } 
  const user = await userCred.findById(userId);
  if (!user) {
    return [ 400, "User does not exist"]
  } 
  const isCorrectPassword = bcryptjs.compareSync(credentials.password, user.password)
  if (!isCorrectPassword) {
    return [ 400, "Invalid credentials"]
  } else {
    return [ 200, credentials];
  }
}