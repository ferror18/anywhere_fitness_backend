module.exports = {
    isValidReg,
    isValidLog
    };
  function isValidReg(credentials, userMatch) {
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
        return [ 201, credentials];
      }
    }
  
    // function isValidLog(credentials) {
    //   if (!credentials.password) {
    //     return [ 400, 'Please provide a password']
    //   } if (!credentials.username) {
    //     return [ 400, 'Please provide a username']
    //   } if (credentials === null || credentials === undefined) {
    //     return [ 400, "please provide username and password and the password shoud be alphanumeric" ]
    //   }if (typeof credentials.password  !== 'string' || typeof credentials.username  !== 'string') {
    //     return [ 400, "Invalid format" ]
    //   } else {
    //     return [ 200, credentials];
    //   }
    // }
  
  
    function isValidLog(credentials) {
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
  // function hashedPassword(params) {
    
  // }
  //   const hashedPassword = await new Promise((resolve, reject) => {
  //     bcrypt.hash(password, saltRounds, function(err, hash) {
  //       if (err) reject(err)
  //       resolve(hash)
  //     });
  //   })
  
  //   return hashedPassword
  // }