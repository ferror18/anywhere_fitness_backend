const { findById } = require("../user/userModel");

const isValidUser = async data => {
     const result = await findById(data.instructor_id)
     return !!result
}

const isValidInstructor = newInstructor => [true, 'Succes']

module.exports = {
    isValidInstructor,
    isValidUser
}