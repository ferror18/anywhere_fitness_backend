const router = require("express").Router();
// const { isValidUser } = require("./UserServices.js");
const User = require("./userDataModel");

router.post('/', (req, res) => {
    const requestData = req.body
    const [ isValid, message ] = isValidUser(requestData)
    try {
        if (isValid) {
            User.add(requestData)
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
    User.remove(req.body.userId)
      .then((response) =>
        res.status(200).json({ message: "success", count: response })
      )
      .catch((error) => res.json({ message: error.message }));
  });

router.patch("/:userId", (req, res) => {
const changes = {
    updates: req.body,
    userId: req.params.userId
}
// console.log(changes);
// res.status(200).json('done')
User.update(changes)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.json({ message: error.message }));
});

router.get('/:userId', (req, res) => {
    User.findById(req.params.userId)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.json({ message: error.message }));
})
module.exports = router;