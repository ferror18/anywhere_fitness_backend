const bcryptjs = require("bcryptjs");
const userData = require('../user/userData/userDataModel')
const Class = require('./classModel')
const hrEnu = [1,2,3,4,5,6,7,8,9,10,11,12];
const hrPer = ['AM', 'PM']
const dayEnu = [0,1,2,3,4,5,6]


module.exports.enu = {hrEnu,hrPer,dayEnu,}

module.exports.isValidForPost = async function (credentials) {
  let missingField = false
  const requiredFields = [
    "title",
    "description",
    "owner",
    "day",
    "start",
    "end",
    "startHper",
    "endHper"
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
  }if (!typeof credentials.title === 'string') {
    return [400, "Title is not an string"]
  }if (!typeof credentials.description === 'string') {
    return [400, "Description is not an string"]
  }if (dayEnu.includes(credentials.day)) {
    return [400, `Day must be one of ${dayEnu} - 1 = Monday`]
  }if (hrPer.includes(credentials.startHper) || hrPer.includes(credentials.endHper)) {
    return [400, `starHper or endHper must be one of ${hrPer}`]
  }if (hrEnu.includes(credentials.end)) {
    return [400, `start and end must be one of ${hrEnu}`]
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
  }if (dayEnu.includes(credentials.day)) {
    return [400, `Day must be one of ${dayEnu} - 1 = Monday`]
  }if (hrPer.includes(credentials.startHper) || hrPer.includes(credentials.endHper)) {
    return [400, `starHper or endHper must be one of ${hrPer}`]
  }if (hrEnu.includes(credentials.end)) {
    return [400, `start and end must be one of ${hrEnu}`]
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