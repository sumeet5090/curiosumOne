let express = require('express'),
    Event = require('./../models/event.model'),
    router = express.Router()

router.get('/', async (req, res) => {
    try {
        let events = await Event.find()
        if (!events) {
            return res.send({
                message: "Couldn't GET Events."
            })
        }
        return res.send({
            events
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error."
        })
    }
})
router.get('/:id', async (req, res) => {
    let id = req.params.id
    try {
        let event = await Event.findOne({
            _id: id
        })
        if (!event) {
            return res.send({
                message: "Couldn't GET Event."
            })
        }
        return res.send({
            event
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error."
        })
    }
})

router.post('/create', async (req, res) => {
    let body = req.body,
        organizersArray = [body.orgranizer1, body.orgranizer2] || [],
        eventInfo = {
            name: body.name,
            date: body.date,
            venue: body.venue,
            organizer: organizersArray
        }
    console.log(body);
    try {
        let newEvent = await new Event(eventInfo).save()
        if (!newEvent) {
            return res.send({
                message: "Couldn't Create New Event"
            })
        }
        return res.send({
            newEvent
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Some error occured."
        })
    }
})

router.put('/update/:id', async (req, res) => {
    let id = req.params.id,
        body = req.body,
        organizersArray = [body.orgranizer1, body.orgranizer2] || [],
        updatedEventInfo = {
            name: body.name,
            date: body.date,
            venue: body.venue,
            organizer: organizersArray
        }
    try {
        let updatedEvent = await Event.findOneAndUpdate({
                _id: id
            },
            updatedEventInfo, {
                new: true
            })
        if (!updatedEvent) {
            return res.send({
                message: "Couldn't Updated Event."
            })
        }
        return res.send({
            updatedEvent
        })
    } catch (error) {
        return res.status(500).send({
            message: "Some error occured."
        })
    }
})

router.delete('/delete/:id', async (req, res) => {
    let id = req.params.id
    try {
        let deletedEvent = await Event.findOneAndRemove({
            _id: id
        })
        if (!deletedEvent) {
            return res.send({
                message: "Couldn't deleted Event."
            })
        }
        return res.send({
            deletedEvent
        })
    } catch (error) {
        return res.status(500).send({
            message: "Some error occured."
        })
    }
})

module.exports = router;