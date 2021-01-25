const router = require("express").Router();
const { isValidForPost, isValidForPatch } = require("./utilities.js");
const User = require("./userDataModel");

router.post('/', async (req, res) => {
    try {
    const requestData = req.body
    const [ statusCode, message ] = await isValidForPost(requestData)
        if (statusCode === 200) {
            User.add(requestData)
            .then(response => res.status(statusCode).json(response))
            .catch((error) => res.status(statusCode).json({ message: error.message }));
        } else {
            res.status(statusCode).json({message: message})
        }
    } catch (error) {
        throw error
    }

})

router.delete("/", (req, res) => {
        res.status(400).json({ message: "Failed, to delete UserData pls delete userCredentials Instead"})
  });

router.patch("/:userId", async (req, res) => {
    try {
        const [ receivedData, userId ] = [ req.body, Number(req.params.userId)]
        const [ statusCode, message ] = await isValidForPatch(receivedData, userId)
        if (statusCode === 200) {
            const changes = {updates: req.body,userId: req.params.userId}
            User.update(changes)
                .then((response) => res.status(200).json(response))
                .catch((error) => res.json({ message: error.message }));
        } else {
            res.status(statusCode).json({message: message})
        }
    } catch (error) {
        throw error
    }
});

router.get('/:userId', (req, res) => {
    User.findById(req.params.userId)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.json({ message: error.message }));
})
module.exports = router;