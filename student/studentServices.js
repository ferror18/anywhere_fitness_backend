const { findById } = require("../user/userModel");

const isValidUser = async data => {
     const result = await findById(data.student_id)
     return !!result
}

const isValidStudent = newStudent => [true, 'Succes']

module.exports = {
    isValidUser,
    isValidStudent
}