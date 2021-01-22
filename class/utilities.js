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
  const turnToNum = [ ,
    "start",
    "end",
    "owner"
  ]

  turnToNum.forEach(field => credentials[field] = Number(credentials[field]))
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
  }if (!dayEnu.includes(credentials.day)) {
    console.log(credentials.day);
    return [400, `Day must be one of '${dayEnu}' where 1 = Monday etc`]
  }if (!hrPer.includes(credentials.startHper) || !hrPer.includes(credentials.endHper)) {
    console.log(credentials.startHper);
    return [400, `starHper or endHper must be one of '${hrPer}'`]
  }if (!hrEnu.includes(credentials.end) || !hrEnu.includes(credentials.start)) {
    console.log(credentials.startHper);
    return [400, `start and end must be one of '${hrEnu}'`]
  }
  const userDataFromdb = await userData.findById(credentials.owner)
  if (!userDataFromdb) {
    return [400, "Owner does not exist"]
  } else {
      return [ 200, credentials]
  }
}

module.exports.isValidForGet = async function (credentials) {
  if (credentials === null || credentials === undefined) {
    return [ 400, 'No classId provided']
  }
  const turnToNum = [ ,
    "classId",
    "userId",
  ]
  turnToNum.forEach(field => credentials[field] = Number(credentials[field]))
  if (!Number.isInteger(credentials) || !Number.isSafeInteger(credentials)) {
    return [ 400, 'ClassId is not a valid Integer']
  }
  const cls = await Class.findById(credentials)
  if (!cls) {
    return [ 400, 'Class does not exist, wrong Id']
  } else {
    return [ 200, 'Succes']
  }
}

module.exports.isValidForGetByFilter = async function (filter, target ) {
  const validFilters = [
    "title",
    "description",
    "owner",
    "day",
    "start",
    "end",
    "startHper",
    "endHper"
  ]
  const turnToNum = [ 
    "classId",
    "owner",
    "day",
    "start",
    "end"
  ]
  if (filter === null || filter === undefined) { //Check filter is not null or undefined
    return [ 400, 'No filter provided']
  }if (target === null || target === undefined) {//Check target is not null or undefined
    return [ 400, 'No target provided']
  }if (!validFilters.includes(filter)) { //Check filter is a valid filter
    return [ 400, `Invalid filter: ${filter}.  Valid filters --> '${validFilters}'`]
  }if (!turnToNum.includes(filter)) { //Check if target 'should' be an integer
    target = Number(target)
    if (!Number.isInteger(target) || !Number.isSafeInteger(target)) { //Check that target actually is an integer
      return [ 400, `${filter} is not a valid Integer`]
    }
  } else {
    if (typeof target !== 'string') {
      return [ 400, `${filter} type values should be strings`]
    }
  }
    return [ 200, 'Succes']
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