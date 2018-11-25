const Event = require('./../models/event.model')
const Car = require('./../models/car.model')
const Announcement = require('./../models/announcement.model')
const Schedule = require('./../models/schedule.model')
const LiveTiming = require('./../models/livetiming.model')
const TechUpdate = require('./../models/techUpdates.model')
const Team = require('./../models/team.model')
const mongoose = require('mongoose')
const Response = require('./../services/response')
const ObjectId = mongoose.Types.ObjectId
const getAllEvents = async (req, res) => {
  try {
    let events = await Event.find().populate('organizers').exec()
    if (events.length > 0) {
      return Response.success(res,{
        events: events
      })
    }
    return Response.failed(res,{
      message: "No events found."
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getOneEvent = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).exec()
    if (event) {
      return Response.success(res,{
        event: event
      })
    }
    return Response.failed(res,{
      message: "No event found."
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getOneEventByName = async (req, res) => {
  try {
    let event = await Event.findOne({ event_short: req.params.event_name })
    if (event) {
      return Response.success(res,{
        event: event
      })
    }
    return Response.failed(res,{
      message: "No event found."
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getTeamForEvent = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).populate('teams').populate('teams.users').exec()
    if (event) {
      if (event.teams.length > 0) {
        return Response.success(res,{
          teams: event.teams
        })
      }
      return Response.failed(res,{
        message: "Event has no teams."
      })
    }
    return Response.failed(res,{
      message: "No event found."
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getAnnouncementsForEvent = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).exec()
    if (event) {
      let announcements = await Announcement.find({ event: event._id }, null, { sort: { dateTime: 'desc' } }).populate('author').exec()
      if (announcements.length > 0) {
        return Response.success(res,{
          announcements: announcements
        })
      }
      return Response.failed(res,{
        message: "Event has no announcements."
      })
    }
    return Response.failed(res,{
      message: "No event found."
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getOneTechupdate = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).exec()
    if (event.length > 0) {
      let find_id = event.tech_updates.indexOf(req.params.id)
      let out = await event.populate('tech_updates').exec()
      if (find_id > -1) {
        return Response.success(res,{
          tech_update: event.tech_updates[find_id]
        })
      }
    }
    return Response.failed(res, {message: "Not found"})
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getOneSchedule = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).exec()
    if (event.length > 0) {
      let find_id = event.schedules.indexOf(req.params.id)
      if (find_id > -1) {
        let out = await event.populate('schedules').exec()
        return Response.success(res,{
          schedules: out.schedules[find_id]
        })
      }
    }
    return Response.failed(res, {message: "Not found"})
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getOneLivetiming = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).exec()
    if (event.length > 0) {
      let find_id = event.live_timings.indexOf(req.params.id)
      let out = await event.populate('tech_updates').exec()
      if (find_id > -1) {
        return Response.success(res,{
          live_timings: out.live_timings[find_id]
        })
      }
    }
    return Response.failed(res, {message: "Not found"})
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getAllTechupdates = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).populate('tech_updates').exec()
    if (event.length > 0) {
      return Response.success(res,{
        event: event
      })
    }
    return Response.failed(res, {message: "Not found"})
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getAllSchedules = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).populate('schedules').exec()
    if (event.schedules.length > 0) {
      return Response.success(res, { schedules: event.schedules })
    }
    return Response.failed(res, {message: "Not found"})
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getAllLivetimings = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).populate('list_timings').exec()
    if (event.length > 0) {
      return Response.success(res,{
        event: event
      })
    }
    return Response.failed(res, {message: "Not found"})
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getAllCars = async (req, res) => {
  let cars
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).exec()
    cars = await Car.find({ event_id: event._id }).populate('team_id').exec()
    if (cars) {
      if (cars.length > 0) {
        return Response.success(res,{
          cars: cars
        })
      }
      return Response.success(res,{
        cars: []
      })
    }
    return Response.failed(res, {message: "Not found"})
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
      link: body.event_link,
      start_date: body.start_date,
      end_date: body.end_date
    })
    let saved = await newEvent.save()
    if (saved) {
      return Response.success(res, { message: "Created a event!" }, 200)
    }
    return Response.failed(res, { message: "failed to create an event" }, 300)
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
      let extractTags = []
      let new_ancmt = await new Announcement({
        event: event._id,
        dateTime: req.body.date_time || Date.now(),
        author: req.body.author || req.user,
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags
      }).save()
      if (new_ancmt) {
        return Response.success(res, {
          message: "Created new announcement."
        })
      }
      return Response.failed(res, {
        message: "Couldn't create announcement."
      })
    }
    return Response.failed(res, {
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
          if (out.nModified >= 1 && out.ok == 1) {
            return Response.success(res,{
              message: "Created car and linked to team."
            })
          } else {
            return Response.failed(res,{
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
            return Response.success(res, {
              message: "Created live timing & linked to event."
            })
          }
          return Response.failed(res,{
            message: "Created live timing, but couldn't link it to event."
          })
        }
        return Response.failed(res,{
          message: "Couldn't create live timing."
        })
      }
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
      let team = await Team.findOne({ _id: req.params.team_id })
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
            return Response.success(res, {
              message: "Created team update & linked to event."
            })
          }
          return Response.failed(res,{
            message: "Created team update, but couldn't link it to event."
          })
        }
        return Response.failed(res,{
          message: "Couldn't create team update."
        })
      }
    }
    return Response.failed(res,{
      message: "Event not found."
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const createSchedule = async (req, res) => {
  try {
    let event = await Event.findOne({ _id: req.params.id }), body = req.body
    if (event) {
      let schedule = await new Schedule({
        day_number: body.day_number,
        day: body.day,
        date: body.date,
        activity: body.activity,
        start_time: body.start_time,
        end_time: body.end_time,
        location: body.location,
        comments: body.comments,
        volunteer_view: body.volunteer_view,
        participant_view: body.participant_view,
        visitor_view: body.visitor_view,
        event_id: event._id
      }).save()
      if (schedule) {
        let out = await event.updateOne({ $push: { schedules: schedule } }).exec()
        if (out.nModified >= 1 && out.ok == 1) {
          return Response.success(res, { message: "Created schedule!" }, 200)
        }
        return Response.failed(res, {
          message: "Created schedule, but couldn't link it to event."
        }, 200)
      }
      return Response.failed(res, {
        message: "Couldn't create schedule"
      })
    }
    return Response.failed(res, {
      message: "Event not found."
    })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." }, 500)
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
          return Response.success(res,{
            message: "Team already registered for event."
          })
        } else {
          let output = await event.updateOne({ $push: { teams: team_id } }, { new: true }).exec()
          if (output.nModified >= 1 && output.ok == 1) {
            return Response.success(res,{
              message: "Team registered."
            })
          }
        }
      }
      return Response.failed(res,{ message: "Couldn't update event." })
    }
    return Response.failed(res,{
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
      return Response.success(res,{ message: "No event found." })
    }
    return Response.success(res,{
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
      return Response.success(res,{
        message: "Couldn't delete event."
      })
    }
    return Response.success(res,{
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
  getOneEventByName,
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