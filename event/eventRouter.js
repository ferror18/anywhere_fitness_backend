const router = require("express").Router();
const { isValidForPost, isValidForPatch, isValidForGet, isValidForDelete, isValidForGetByFilter } = require("./utilities.js");
const Event = require("./eventModel");
const Class = require('../class/classModel')

router.post('/', async (req, res) => {
    try {
    const requestData = req.body
    const [ statusCode, payload ] = await isValidForPost(requestData)
        if (statusCode === 200) {
            //Find class
            Event.add(payload)
            .then(response => {
                Class.updateEnrolled(payload.classId, 1)
                .then(enrolled => res.status(statusCode).json({event: response, enrolled: enrolled}))
                .catch((error) => res.status(statusCode).json({ message: error.message }));
            })
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
        const requestData = Number(req.body.eventId)
        const [ statusCode, payload ] = await isValidForDelete(requestData)
        if (statusCode === 200) {
            Event.remove(payload)
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

router.patch("/:eventId", async (req, res) => {
    try {
        const [ receivedData, eventId ] = [ req.body, Number(req.params.eventId)]
        const [ statusCode, message ] = await isValidForPatch(receivedData, eventId)
        if (statusCode === 200) {
            const changes = {updates: receivedData,  eventId: eventId}
            Event.update(changes)
                .then((response) => res.status(200).json(response))
                .catch((error) => res.json({ message: error.message }));
        } else {
            res.status(statusCode).json({message: message})
        }
    } catch (error) {
        throw error
    }
});

router.get('/:eventId', async (req, res) => {
    try {
        const recivedData = Number(req.params.eventId)
        const [ statusCode, payload ] = await isValidForGet(recivedData);
        if (statusCode === 200) {
            Event.findById(recivedData)
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
            Event.findBy(filter, target)
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