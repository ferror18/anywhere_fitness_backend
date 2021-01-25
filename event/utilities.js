const userData = require('../user/userData/userDataModel')
const Class = require('../class/classModel')
const Event = require('./eventModel')
const { enu: {hrEnu,hrPer,dayEnu,}} = require('../class/utilities')


module.exports.enu = {hrEnu,hrPer,dayEnu,}

module.exports.isValidForPost = async function (credentials) {
  let missingField = false
  const requiredFields = [
    "classId",
    "userId",
  ]
  const turnToNum = [ ,
    "classId",
    "userId",
  ]

  turnToNum.forEach(field => credentials[field] = Number(credentials[field]))
  if (credentials === null || credentials === undefined) {
      return [ 400, "No data sent" ]
  }
  //Check all required fields do not equeal null or undefined
  for (let i = 0; i < requiredFields.length; i++) {
        if (credentials[requiredFields[i]] === undefined || credentials[requiredFields[i]] === null) {
          missingField = requiredFields[i]
          break 
        }
  }
  if (missingField) {
      return [ 400, `Missing required field:'${missingField}' `]
  }if (!Number.isInteger(credentials.classId) || !Number.isSafeInteger(credentials.classId)) {
    return [400, "classId key is not an integer"]
  }if (!Number.isInteger(credentials.userId) || !Number.isSafeInteger(credentials.userId)) {
    return [400, "userId is not an string"]
  }
  const cls = await Class.findById(credentials.classId)
  if (!cls) {
    return [400, "Class does not exist"]
  }
  const user = await userData.findById(credentials.userId)
  if (!user) {
    return [400, "User does not exist"]
  }
  const matchingEvents = await Event.findBy('userId', credentials.userId)
  if (matchingEvents.length > 0) {
    if (matchingEvents.some(e => e.class.classId === credentials.classId)) {
      return [400, "User is already enrolled in that class"]
    }
  }
    return [ 200, credentials]
}

  module.exports.isValidForGet = async function (credentials) {
  const cls = await Class.findBy({classId: credentials})
  if (!cls.length) {
    return [ 400, 'Class does not exist, wrong Id']
  } else {
    return [ 200, 'Succes']
  }
}

module.exports.isValidForGetByFilter = async function (filter, target) {
  const validFilters = [
    "eventId",
    "classId",
    "userId"
  ]
  const turnToNum = [ 
    "eventId",
    "classId",
    "userId"
  ]
  if (filter === null || filter === undefined) { //Check filter is not null or undefined
    return [ 400, 'No filter provided']
  }if (target === null || target === undefined) {//Check target is not null or undefined
    return [ 400, 'No target provided']
  }if (!validFilters.includes(filter)) { //Check filter is a valid filter
    return [ 400, `Invalid filter: ${filter}.  Valid filters --> '${validFilters}'`]
  }if (turnToNum.includes(filter)) { //Check if target 'should' be an integer
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

module.exports.isValidForDelete = async function (credentials) {
  if (credentials === null || credentials === undefined) {
    return [ 400, "classId is required to delete class" ]
  } if (!Number.isInteger(credentials) || !Number.isSafeInteger(credentials)) {
    return [ 400, "Invalid format" ]
  } 
  const cls = await Event.findById(credentials);
  if (!cls) {
    return [ 400, "Event does not exist"]
  }else {
    return [ 200, credentials];
  }
}