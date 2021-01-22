const router = require("express").Router();
const { isValidForPost, isValidForPatch, isValidForGet, isValidForDelete, isValidForGetByFilter } = require("./utilities.js");
const Class = require("./classModel");

router.post('/', async (req, res) => {
    try {
    const requestData = req.body
    const [ statusCode, payload ] = await isValidForPost(requestData)
        if (statusCode === 200) {
            Class.add(payload)
            .then(response => res.status(statusCode).json(response))
            .catch((error) => res.status(statusCode).json({ message: error.message }));
        } else {
            res.status(statusCode).json({message: payload})
        }
    } catch (error) {
        throw error
    }

})

router.delete("/", async (req, res) => {
    
      try {
        const requestData = Number(req.body.classId)
        const [ statusCode, payload ] = await isValidForDelete(requestData)
        if (statusCode === 200) {
            Class.remove(payload)
            .then((response) =>
                res.status(statusCode).json({ message: "success", count: response }))
            .catch((error) => res.status(statusCode).json({ message: error.message }));
        
        } else {
            res.status(statusCode).json({ message: payload })
        }
    } catch (error) {
        throw error
    }
  });

router.patch("/:classId", async (req, res) => {
    try {
        const [ receivedData, classId ] = [ req.body, Number(req.params.classId)]
        const [ statusCode, message ] = await isValidForPatch(receivedData, classId)
        if (statusCode === 200) {
            const changes = {updates: receivedData,  classId: classId}
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

router.get('/:ClassId', async (req, res) => {
    try {
        const recivedData = Number(req.params.ClassId)
        const [ statusCode, payload ] = await isValidForGet(recivedData);
        if (statusCode === 200) {
            Class.findById(recivedData)
            .then((response) => res.status(statusCode).json(response))
            .catch((error) => res.status(statusCode).json({ message: error.message }));
        } else {
            res.status(statusCode).json({message: payload})
        }
    } catch (error) {
        throw error
    }
})

router.get('/filter/:filter/:target', async (req, res) => {
    try {
        const [ filter, target ] = [ req.params.filter, req.params.target ]
        const [ statusCode, payload ] = await isValidForGetByFilter(filter, target);
        if (statusCode === 200) {
            Class.findBy(filter, target)
            .then((response) => res.status(statusCode).json(response))
            .catch((error) => res.status(statusCode).json({ message: error.message }));
        } else {
            res.status(statusCode).json({message: payload})
        }
    } catch (error) {
        throw error
    }
})
module.exports = router;