const { Router } = require('express')
const router = Router();
const Event = require('./../../models/event.model')
const Announcement = require('./../../models/announcement.model')
const Team = require('./../../models/team.model')
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
router.get('/:id/teams', async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id }).populate('teams').populate('teams.users').exec()
        if (event) {
            if (event.teams.length > 0) {
                return res.send({
                    teams: event.teams
                })
            }
            return res.send({
                message: "Event has no teams."
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
router.get('/:id/announcements', async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id })
        if (event) {
            let announcements = await Announcement.find({event: event._id}, null, { sort: { dateTime: 'desc' } }).populate('author').exec()
            if (announcements.length > 0) {
                return res.send({
                    announcements: announcements
                })
            }
            return res.send({
                message: "Event has no announcements."
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
// Admin / Orgainizer Route
router.post('/:id/create/announcement', async (req, res) => {
    try {
        let event_id = req.params.id,
            event = await Event.findOne({ _id: event_id })
        if (event) {
            let extractTags = [], tags = (req.body.tags).split(',')
            if (tags.length > 0) {
                tags.forEach(tag => {
                    extractTags.push(tag)
                })
            }
            console.log(req.user)
            let new_ancmt = await new Announcement({
                event: event._id,
                dateTime: req.body.date_time || Date.now(),
                author: req.user || null,
                title: req.body.title,
                description: req.body.description,
                tags: extractTags
            }).save()
            return res.send({
                message: "Created new announcement."
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

router.post('/:id/add/team', async (req, res) => {
    let event_id = req.params.id
    try {
        let team_id = req.body.team_id
        let team = await Team.findOne({ _id: team_id })
        if (team) {
            let event = await Event.findOne({ _id: event_id })
            if (event) {
                if (event.teams.indexOf(team_id) > -1) {
                    return res.send({
                        message: "Team already registered for event."
                    })
                } else {
                    let output = await event.updateOne({ $push: { teams: team_id } }, { new: true }).exec() 
                    console.log(output)
                    if (output.nModified >= 1 && output.ok == 1) {
                        return res.send({
                            message: "Team registered."
                        })
                    }
                }
            }
            return res.send({ message: "Couldn't update event." })
        }
        return res.send({
            message: "No such team in records."
        })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
})

router.post('/create', async (req, res) => {
    try {
        let body = req.body, newEvent, organizers, edited = []
        if (body.event_organizers) {
            organizers = body.event_organizers.split(",")
            organizers.forEach(organizer => {
                edited.push(mongoose.Types.ObjectId(organizer))
            })
        }
        newEvent = new Event({
            name: body.event_name,
            venue: body.event_venue,
            organizer: edited,
            link: body.event_link
        })
        let saved = await newEvent.save()
        if (saved) {
            return res.send({
                event: newEvent
            })
        }
        return res.send({ message: "failed to create an event" })
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id,
            event = await Event.findOneAndUpdate({ _id: id }, { new: true })
        if (!event) {
            return res.send({ message: "No event found." })
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
            event = await Event.findOneAndDelete({ _id: id })
        if (!event) {
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