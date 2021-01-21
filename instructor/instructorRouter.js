const router = require("express").Router();
const { isValidInstructor } = require("./instructorServices.js");
const Instructor = require("./instructorModel.js");

router.post('/', (req, res) => {
    const instructorData = req.body
    const [ isValid, message ] = isValidInstructor(instructorData)
    try {
        if (isValid) {
            Instructor.add(instructorData)
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
    Instructor.remove(req.body.instructor_id)
      .then((response) =>
        res.status(200).json({ message: "success", count: response })
      )
      .catch((error) => res.json({ message: error.message }));
  });

router.patch("/:instructor_id", (req, res) => {
const changes = {
    updates: req.body,
    instructor_id: req.params.instructor_id
}
Instructor.update(changes)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.json({ message: error.message }));
});

router.get('/:instructor_id', (req, res) => {
    Instructor.findById(req.params.instructor_id)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.json({ message: error.message }));
})
module.exports = router;