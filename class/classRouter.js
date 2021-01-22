const router = require("express").Router();
const { isValidForPost, isValidForPatch } = require("./utilities.js");
const Class = require("./classModel");

router.post('/', async (req, res) => {
    try {
    const requestData = req.body
    const [ statusCode, message ] = await isValidForPost(requestData)
        if (statusCode === 200) {
            Class.add(requestData)
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
    Class.remove(req.body.ClassId)
      .then((response) =>
        res.status(200).json({ message: "success", count: response })
      )
      .catch((error) => res.json({ message: error.message }));
  });

router.patch("/:ClassId", async (req, res) => {
    try {
        const [ statusCode, message ] = await isValidForPatch(req.body, Number(req.params.ClassId))
        if (statusCode === 200) {
            const changes = {updates: req.body,ClassId: req.params.ClassId}
            Class.update(changes)
                .then((response) => res.status(200).json(response))
                .catch((error) => res.json({ message: error.message }));
        } else {
            res.status(statusCode).json({message: message})
        }
    } catch (error) {
        throw error
    }
});

router.get('/:ClassId', (req, res) => {
    Class.findById(req.params.ClassId)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.json({ message: error.message }));
})
module.exports = router;