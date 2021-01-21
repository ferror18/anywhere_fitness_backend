const router = require("express").Router();
const { isValidStudent } = require("./studentServices.js");
const Student = require("./studentModel.js");

router.post('/', (req, res) => {
    const studentData = req.body
    const [ isValid, message ] = isValidStudent(studentData)
    try {
        if (isValid) {
            Student.add(studentData)
            .then(response => res.status(200).json(response))
            .catch((error) => res.json({ message: error.message }));
        } else {
            throw message
        }
    } catch (error) {
        console.log(error);
    }
})

router.delete("/", (req, res) => {
    Student.remove(req.body.student_id)
      .then((response) =>
        res.status(200).json({ message: "success", count: response })
      )
      .catch((error) => res.json({ message: error.message }));
  });

router.patch("/:student_id", (req, res) => {
const changes = {
    updates: req.body,
    student_id: req.params.student_id
}
// console.log(changes);
// res.status(200).json('done')
Student.update(changes)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.json({ message: error.message }));
});

router.get('/:student_id', (req, res) => {
    Student.findById(req.params.student_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.json({ message: error.message }));
})
module.exports = router;