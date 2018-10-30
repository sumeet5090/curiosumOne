const { Router } = require('express')
const router = Router();
const Event = require('./../../models/event.model')
const EventController = require('./../../controllers/event')
const mongoose = require('mongoose')
router.get('/', async (req, res) => {
    try {
        let events = await Event.find().populate('organizer').exec()
        if (events.length > 0) {
            return res.send({
                events: events
            })
        }
        return res.send({
            message: "No events found."
        })
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }
})

router.get('/:id', async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id })
        if (event) {
            return res.send({
                event: event
            })
        }
        return res.send({
            message: "No event found."
        })
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.post('/create', async (req, res) => {
    try {
        let body = req.body, newEvent, organizers, edited = []
        organizers = body.event_organizer.split(",")
        organizers.forEach(organizer => {
            edited.push(mongoose.Types.ObjectId(organizer))
        })
        newEvent = new Event({
            name: body.event_name,
            venue: body.event_venue,
            organizer: edited,
            link: body.event_link
        })
        let saved = await newEvent.save()
        if(saved){
            return res.send({
                event: newEvent
            })
        }
        return res.send({message: "failed to create an event"})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id,
        event = await Event.findOneAndUpdate({_id: id}, {new: true})
        if (!event){
            return res.send({message: "No event found."})
        }
        return res.send({
            event: event
        })
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id,
        event = await Event.findOneAndDelete({_id: id})
        if (!event){
            return res.send({
                message: "Couldn't delete event."
            })
        }
        return res.send({
            deleted_event: event
        })
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

module.exports = router;