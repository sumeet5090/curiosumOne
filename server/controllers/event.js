const Event = require('./../models/event.model')
const Car = require('./../models/car.model')
const Announcement = require('./../models/announcement.model')
const Schedule = require('./../models/schedule.model')
const LiveTiming = require('./../models/livetiming.model')
const TechUpdate = require('./../models/techUpdates.model')
const Team = require('./../models/team.model')
const mongoose = require('mongoose')

const getAllEvents = async (req, res) => {
    try {
        let events = await Event.find().populate('organizers').exec()
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
        return res.sendStatus(500)
    }
}

const getOneEvent = async (req, res) => {
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
}

const getTeamForEvent = async (req, res) => {
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
}

const getAnnouncementsForEvent = async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id })
        if (event) {
            let announcements = await Announcement.find({ event: event._id }, null, { sort: { dateTime: 'desc' } }).populate('author').exec()
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
}

const getOneTechupdate = async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id })
        if (event.length > 0) {
            let find_id = event.tech_updates.indexOf(req.params.id)
            let out = await event.populate('tech_updates').exec()
            if (find_id > -1) {
                return res.send({
                    tech_update: event.tech_updates[find_id]
                })
            }
        }
        return res.sendStatus(404)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

const getOneSchedule = async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id })
        if (event.length > 0) {
            let find_id = event.schedules.indexOf(req.params.id)
            if (find_id > -1) {
                let out = await event.populate('schedules').exec()
                return res.send({
                    schedules: out.schedules[find_id]
                })
            }
        }
        return res.sendStatus(404)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

const getOneLivetiming = async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id })
        if (event.length > 0) {
            let find_id = event.live_timings.indexOf(req.params.id)
            let out = await event.populate('tech_updates').exec()
            if (find_id > -1) {
                return res.send({
                    live_timings: out.live_timings[find_id]
                })
            }
        }
        return res.sendStatus(404)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

const getAllTechupdates = async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id }).populate('tech_updates').exec()
        if (event.length > 0) {
            return res.send({
                event: event
            })
        }
        return res.sendStatus(404)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

const getAllSchedules = async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id }).populate('schedules').exec()
        if (event.length > 0) {
            return res.send({
                event: event
            })
        }
        return res.sendStatus(404)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

const getAllLivetimings = async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id }).populate('list_timings').exec()
        if (event.length > 0) {
            return res.send({
                event: event
            })
        }
        return res.sendStatus(404)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

const getAllCars = async (req, res) => {
    let cars, event_id = req.params.id
    try {
        cars = await Car.find({ event_id: event_id }).populate('team_id').exec()
        if (cars) {
            if (cars.length > 0) {
                return res.send({
                    cars: cars
                })
            }
            return res.send({
                cars: []
            })
        }
        return res.sendStatus(404)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

const createEvent = async (req, res) => {
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
}

const createAnnouncement = async (req, res) => {
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
}

const createCar = async (req, res) => {
    try {
        let event_id = req.params.id, team_id = req.params.team_id, team, event
        team = await Team.findOne({ _id: team_id })
        if (team) {
            event = await Event.findOne({ _id: event_id })
            if (event) {
                let car = await new Car({
                    car_number: req.body.car_number,
                    event_id: event._id,
                    team_id: team._id
                }).save()
                if (car) {
                    let out = await team.updateOne({ car_id: car._id }).exec()
                    console.log(out)
                    if (out.nModified >= 1 && out.ok == 1) {
                        return res.send({
                            success: true,
                            message: "Created car and linked to team."
                        })
                    } else {
                        return res.send({
                            success: false,
                            message: "Couldn't create car."
                        })
                    }
                }
            }
        }
        return res.sendStatus(404)
    } catch (error) {

    }
}

const createLivetiming = async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id })
        if (event) {
            let team = await Team.findOne({ _id: req.params.team_id })
            if (team) {
                let liveTiming = await new LiveTiming({
                    team_id: team._id,
                    event_name: req.body.event_name,
                    lap_number: req.body.lap_number,
                    lap_time: req.body.lap_time,
                    driver_initial: req.body.driver_initial,
                    event_id: event._id
                }).save()
                if (liveTiming) {
                    let out = await event.updateOne({ $push: { live_timings: liveTiming._id } }).exec()
                    if (out.nModified >= 1 && out.ok == 1) {
                        return res.send({
                            message: "Created live timing & linked to event."
                        })
                    }
                    return res.send({
                        message: "Created live timing, but couldn't link it to event."
                    })
                }
                return res.send({
                    message: "Couldn't create live timing."
                })
            }
            return res.sendStatus(404)
        }
        return res.sendStatus(404)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const createTechupdate = async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id })
        if (event) {
            let team = await Team.findOne({ _id: team_id })
            if (team) {
                let techUpdate = await new TechUpdate({
                    team: team._id,
                    accumulator: req.body.accumulator,
                    scrutineering_elec: req.body.scrutineering_elec,
                    scrutineering_mech: req.body.scrutineering_mech,
                    driver_egress: req.body.driver_egress,
                    tilt: req.body.tilt,
                    noise_ready_to_drive_sound: req.body.noise_ready_to_drive_sound,
                    brakes: req.body.brakes,
                    rain: req.body.rain,
                    event: event._id
                }).save()
                if (techUpdate) {
                    let out = await event.updateOne({ $push: { tech_updates: techUpdate._id } }).exec()
                    if (out.nModified >= 1 && out.ok == 1) {
                        return res.send({
                            message: "Created team update & linked to event."
                        })
                    }
                    return res.send({
                        message: "Created team update, but couldn't link it to event."
                    })
                }
                return res.send({
                    message: "Couldn't create team update."
                })
            }
        }
        return res.send({
            message: "Event not found."
        })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const createSchedule = async (req, res) => {
    try {
        let event = await Event.findOne({ _id: req.params.id })
        if (event) {
            let schedule = await new Schedule({
                day_number: req.body.day_number,
                day: req.body.day,
                date: req.body.date,
                activity: req.body.activity,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                location: req.body.location,
                comments: req.body.comments,
                volunteer_view: Boolean(req.body.volunteer_view),
                participant_view: Boolean(req.body.participant_view),
                visitor_view: Boolean(req.body.visitor_view || true),
            }).save()
            if (schedule) {
                let out = await event.updateOne({ $push: { schedules: schedule } }).exec()
                if (out.nModified >= 1 && out.ok == 1) {
                    return res.send({
                        message: "Created schedule & linked to event."
                    })
                }
                return res.send({
                    message: "Created schedule, but couldn't link it to event."
                })
            }
            return res.send({
                message: "Couldn't create schedule"
            })
        }
        return res.send({
            message: "Event not found."
        })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const addTeam = async (req, res) => {
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
}

const updateEvent = async (req, res) => {
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
}

const deleteEvent = async (req, res) => {
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
}

module.exports = {
    getAllEvents,
    getOneEvent,
    getTeamForEvent,
    getAnnouncementsForEvent,
    getOneTechupdate,
    getOneSchedule,
    getOneLivetiming,
    getAllTechupdates,
    getAllSchedules,
    getAllLivetimings,
    getAllCars,
    createEvent,
    createAnnouncement,
    createCar,
    createLivetiming,
    createTechupdate,
    createSchedule,
    addTeam,
    updateEvent,
    deleteEvent

}