const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const SECRET = process.env.JWT_SECRET
const User = require("./userCredentialsModel.js");


module.exports.isValidForRegister = function (credentials, userMatch) {
    if (!userMatch) {
      return [ 409, 'That email is already in use']
    } if (!credentials.password) {
      return [ 400, 'Please provide a password']
    } if (credentials.password.length < 5) {
      return [ 400, 'Password is too short']
    } if (!credentials.email) {
      return [ 400, 'Please provide a email']
    } if (credentials === null || credentials === undefined) {
      return [ 400, "please provide username and password and the password shoud be alphanumeric" ]
    }if (typeof credentials.password  !== 'string' || typeof credentials.email  !== 'string') {
      return [ 400, "Invalid format" ]
    }else {
      return [ 200, credentials];
    }
  }

  module.exports.isValidForLogin = function (credentials) {
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

module.exports.isValidForDelete = async function (credentials, userId) {
  if (credentials === null || credentials === undefined) {
    return [ 400, "Password is required to delete" ]
  } if (!credentials.password) {
    return [ 400, "Password is required to delete" ]
  } if (typeof credentials.password  !== 'string') {
    return [ 400, "Invalid format" ]
  } 
  const user = await User.findById(userId);
  if (!user) {
    return [ 400, "User does not exist"]
  } 
  const isCorrectPassword = bcryptjs.compareSync(credentials.password, user.password)
  if (!isCorrectPassword) {
    console.log('iscor',isCorrectPassword, user);
    return [ 400, "Invalid credentials"]
  } else {
    return [ 200, credentials];
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
  const user = await User.findById(userId);
  if (!user) {
    return [ 400, "User does not exist"]
  } else {
    return [ 200, "Update succesfull"];
  }
}

module.exports.makeJwt = function (user) {
  const payload = {
    subject: user.userId,
  };
  const options = {
    expiresIn: "24h",
  };
  return jwt.sign(payload, SECRET, options);
}