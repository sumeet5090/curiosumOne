const Event = require('./../models/event.model')
const Car = require('./../models/car.model')
const Announcement = require('./../models/announcement.model')
const Schedule = require('./../models/schedule.model')
const LiveTiming = require('./../models/livetiming.model')
const TechUpdate = require('./../models/techUpdates.model')
const Team = require('./../models/team.model')
const StaticSchedule = require('./../models/static_schedule.model')
const mongoose = require('mongoose')
const Response = require('./../services/response')
const ObjectId = mongoose.Types.ObjectId

const getAllEvents = async (req, res) => {
  try {
    let events = await Event.find().sort({ start_date: 'descending' }).populate('organizers').exec()
    if (events.length > 0) {
      return Response.success(res, {
        events: events
      })
    }
    return Response.failed(res, {
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
      return Response.success(res, {
        event: event
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

const getOneAnnouncement = async (req, res) => {
  try {
    let event_id = req.params.id,
      annc_id = req.params.annc_id,
      announcement = await Announcement.findOne({ _id: annc_id })
    if (announcement) {
      return Response.success(res, { message: "Announcement found.", announcement })
    }
    return Response.failed(res, { message: "Couldn't get announcement." })
  } catch (error) {
    console.log(error);
    return Response.failed(res, { message: "Internal server error." })
  }
}

const getOneEventByName = async (req, res) => {
  try {
    let event = await Event.findOne({ event_short: req.params.event_name })
    if (event) {
      return Response.success(res, {
        event: event
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

const getTeamForEvent = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).populate('teams').populate({ path: 'teams', populate: { path: 'car', select: 'car_number' } }).populate({ path: 'teams', populate: { path: 'users' } }).exec()
    if (event) {
      if (event.teams.length > 0) {
        return Response.success(res, {
          teams: event.teams
        })
      }
      return Response.failed(res, {
        message: "Event has no teams."
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
        return Response.success(res, {
          announcements: announcements
        })
      }
      return Response.failed(res, {
        message: "Event has no announcements."
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

const getOneTechupdate = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).exec()
    if (event.length > 0) {
      let find_id = event.tech_updates.indexOf(req.params.tu_id)
      let out = await event.populate('tech_updates').exec()
      if (find_id > -1) {
        return Response.success(res, {
          tech_update: event.tech_updates[find_id]
        })
      }
    }
    return Response.failed(res, { message: "Not found" })
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
        return Response.success(res, {
          schedules: out.schedules[find_id]
        })
      }
    }
    return Response.failed(res, { message: "Not found" })
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
        return Response.success(res, {
          live_timings: out.live_timings[find_id]
        })
      }
    }
    return Response.failed(res, { message: "Not found" })
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
    let event = await Event.findOne({ $or: $or }).populate({ path: 'tech_updates', populate: { path: 'team', populate: { path: 'car', select: 'car_number' } } }).exec()
    if (event) {
      return Response.success(res, {
        event: event
      })
    }
    return Response.failed(res, { message: "Not found" })
  } catch (error) {
    console.log(error)
    return res.send
    Status(500)
  }
}

const getAllSchedules = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let schedules
    let isAuthenticated = req.isAuthenticated() || false
    let event = await Event.findOne({ $or: $or })
    if (isAuthenticated) {
      let user_roles = req.user.role
      if (user_roles.contains('admin') || user_roles.contains('staff')) {
        schedules = await Schedule.find({ event_id: event._id })
      } else if (user_roles.contains('participant') && user_roles.contains('volunteer')) {
        schedules = await Schedule.find({ event_id: event._id, $or: [{ volunteer_view: true }, { participant_view: true }, { visitor_view: true }] })
      } else if (user_roles.contains('volunteer') && !user_roles.contains('participant')) {
        schedules = await Schedule.find({ event_id: event._id, $or: [{ volunteer_view: true }, { visitor_view: true }] })
      } else if (!user_roles.contains('volunteer') && user_roles.contains('participant')) {
        schedules = await Schedule.find({ event_id: event._id, $or: [{ participant_view: true }, { visitor_view: true }] })
      } else {
        schedules = await Schedule.find({ event_id: event._id, visitor_view: true })
      }
    } else {
      schedules = await Schedule.find({ event_id: event._id, visitor_view: true })
    }
    if (schedules.length > 0) {
      event.schedules = schedules
      return Response.success(res, { event: event })
    }
    return Response.failed(res, { message: "Not found" })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getOneStaticScheduleEventTeam = async (req, res) => {
  try {
    let event = await Event.findOne({_id: req.params.id})
    let team = await Team.findOne({_id: req.params.team_id})
    if(event && team) {
      let static_schedule = await StaticSchedule.findOne({event: event._id, team: team._id})
      if(static_schedule){
        return Response.success(res, {static_schedule})
      }
    }
    return Response.failed(res, {message: "Not found."})
  } catch (error) {
    console.log(error);
    return Response.failed(res, {message: "Internal server error."})
  }
}


const getAllLivetimings = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    // let event = await Event.findOne({ $or: $or }).populate({ path: 'tech_updates', populate: { path: 'team', populate: { path: 'car', select: 'car_number' } } }).exec()
    // let event = await Event.findOne({ $or: $or }).populate('live_timings').populate({ path: 'live_timings', populate: { path: 'team_id' } }).exec()
    let event = await Event.findOne({ $or: $or }).populate({ path: 'live_timings', populate: { path: 'team_id', populate: { path: 'car', select: 'car_number' } } }).exec()
    if (event) {
      return Response.success(res, {
        event: event
      })
    }
    return Response.failed(res, { message: "Not found" })
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
        return Response.success(res, {
          cars: cars
        })
      }
      return Response.success(res, {
        cars: []
      })
    }
    return Response.failed(res, { message: "Not found" })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getAllStaticSchedulesForEvent = async (req, res) => {
  let schedules, event_id = req.params.id,
    $or = [{ event_short: event_id }]
  if (parseInt(event_id) == event_id) {
    $or.push({ _id: event_id })
  }
  try {
    let event = await Event.findOne({ $or }).populate({ path: 'static_schedule', populate: { path: 'team' } }).exec()
    if (event.static_schedule) {
      if (event.static_schedule.length > 0) {
        return Response.success(res, { static_schedules: event.static_schedule })
      }
      return Response.success(res, { static_schedules: [] })
    }
    return Response.failed(res, { message: "Couldn't get static schedules." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}

const getAllStaticSchedulesForTeam = async (req, res) => {
  let schedules, team_id = req.params.team_id;
  try {
    schedules = await StaticSchedule.find({ team: team_id })
    if (schedules) {
      if (schedules.length > 0) {
        return Response.success(res, { static_schedules: schedules })
      }
      return Response.success(res, { static_schedules: [] })
    }
    return Response.failed(res, { message: "Couldn't get static schedules." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}

/* /api/static-schedule/st_id */
const getOneStaticSchedule = async (req, res) => {
  let stSchedule, st_id = req.params.st_id, team
  try {
    stSchedule = await StaticSchedule.findOne({ _id: st_id })
    if (stSchedule) {
      return Response.success(res, { static_schedule: stSchedule })
    }
    return Response.failed(res, { message: "Couldn't get static schedules" })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getTeamCar = async (req, res) => {
  try {
    let id = req.params.id,
      $or = [{ event_short: id }]
    if (parseInt(id) == id) {
      $or.push({ _id: id })
    }
    let event = await Event.findOne({ $or: $or }).exec()
    let team = await Team.findOne({ _id: req.params.team_id })
    if (event && team) {
      let car = await Car.findOne({ event_id: event._id, team_id: team._id }).populate(['event_id', 'team_id']).exec()
      if (car) {
        return Response.success(res, {
          car: car
        })
      }
    }
    return Response.failed(res, { message: "Not found" })
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
        dateTime: req.body.dateTime || Date.now(),
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
          let out = await team.updateOne({ car: car._id })
          if (out.nModified >= 1 && out.ok == 1) {
            return Response.success(res, {
              message: "Created car and linked to team."
            })
          }
        }
        return Response.failed(res, {
          message: "Couldn't create car."
        })
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
          let out = await event.updateOne({ $push: { live_timings: liveTiming._id } })
          if (out.nModified >= 1 && out.ok == 1) {
            return Response.success(res, {
              message: "Created live timing & linked to event."
            })
          }
          return Response.failed(res, {
            message: "Created live timing, but couldn't link it to event."
          })
        }
        return Response.failed(res, {
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
    let team = await Team.findOne({ _id: req.params.team_id }).populate('car').exec()
    if (event && team) {
      let techUpdate = await TechUpdate.findOne({ team: team._id, event: event._id })
      if (techUpdate) {
        console.log(team.category)
        techUpdate.accumulator = team.category === 'electric' ? req.body.accumulator : false
        techUpdate.scrutineering_elec = team.category === 'electric' ? req.body.scrutineering_elec : false
        techUpdate.scrutineering_mech = req.body.scrutineering_mech
        techUpdate.driver_egress = req.body.driver_egress
        techUpdate.tilt = req.body.tilt
        techUpdate.noise_ready_to_drive_sound = req.body.noise_ready_to_drive_sound
        techUpdate.brakes = req.body.brakes
        techUpdate.rain = req.body.rain
        let tu_saved = await techUpdate.save()
        if (tu_saved) {
          return Response.success(res, { message: "Successfully updated tech update." }, 200)
        }
        return Response.failed(res, { message: "This shouldn't have occured." })
      }
      techUpdate = await new TechUpdate({
        team: team._id,
        accumulator: team.category === 'electric' ? req.body.accumulator : false,
        scrutineering_elec: team.category === 'electric' ? req.body.scrutineering_elec : false,
        scrutineering_mech: req.body.scrutineering_mech,
        driver_egress: req.body.driver_egress,
        tilt: req.body.tilt,
        noise_ready_to_drive_sound: req.body.noise_ready_to_drive_sound,
        brakes: req.body.brakes,
        rain: req.body.rain,
        event: event._id
      }).save()
      if (techUpdate) {
        let out1 = await event.updateOne({ $push: { tech_updates: techUpdate._id } })
        let out2 = await team.updateOne({ $push: { tech_updates: techUpdate._id } })
        if (out1.nModified >= 1 && out1.ok == 1 && out2.nModified >= 1 && out2.ok == 1) {
          return Response.success(res, {
            message: "Created team update & linked to event."
          })
        }
        return Response.failed(res, {
          message: "Created team update, but couldn't link it to event."
        })
      }
      return Response.failed(res, {
        message: "Couldn't create team update."
      })
    }
    return Response.failed(res, {
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
        restriction: body.restriction,
        volunteer_view: body.volunteer_view,
        participant_view: body.participant_view,
        visitor_view: body.visitor_view,
        event_id: event._id
      }).save()
      if (schedule) {
        let out = await event.updateOne({ $push: { schedules: schedule } })
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

const createStaticSchedule = async (req, res) => {
  try {
    let event = await Event.findOne({ _id: req.params.id })
    let team = await Team.findOne({ _id: req.params.team_id }).populate('car').exec()
    if (event && team) {
      let staticSchedule = await StaticSchedule.findOne({ team: team._id, event: event._id })
      if (staticSchedule) {
        staticSchedule.business.queue = req.body.business_queue
        staticSchedule.business.start_time = req.body.business_start_time
        staticSchedule.business.end_time = req.body.business_end_time
        staticSchedule.cost.queue = req.body.cost_queue
        staticSchedule.cost.start_time = req.body.cost_start_time
        staticSchedule.cost.end_time = req.body.cost_end_time
        staticSchedule.design.queue = req.body.design_queue
        staticSchedule.design.start_time = req.body.design_start_time
        staticSchedule.design.end_time = req.body.design_end_time
        let st_saved = await staticSchedule.save()
        if (st_saved) {
          return Response.success(res, { message: "Successfully updated tech update." }, 200)
        }
        return Response.failed(res, { message: "This shouldn't have occured." })
      }
      staticSchedule = await new StaticSchedule({
        event: event._id,
        team: team._id,
        business: {
          queue: body.business_queue,
          start_time: body.business_start_time,
          end_time: body.business_end_time
        },
        cost: {
          queue: body.cost_queue,
          start_time: body.cost_start_time,
          end_time: body.cost_end_time
        },
        design: {
          queue: body.design_queue,
          start_time: body.design_start_time,
          end_time: body.design_end_time
        }
      }).save()
      if (staticSchedule) {
        let out1 = await event.updateOne({ $push: { static_schedule: staticSchedule._id } })
        let out2 = await team.updateOne({ $push: { static_schedule: staticSchedule._id } })
        if (out1.nModified >= 1 && out1.ok == 1 && out2.nModified >= 1 && out2.ok == 1) {
          return Response.success(res, {
            message: "Created static schedule & linked to event."
          })
        }
        return Response.failed(res, {
          message: "Created static schedule, but couldn't link it to event."
        })
      }
      return Response.failed(res, {
        message: "Couldn't create static schedule."
      })
    }
    return Response.failed(res, {
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
          return Response.success(res, {
            message: "Team already registered for event."
          })
        } else {
          let output = await event.updateOne({ $push: { teams: team_id } }, { new: true })
          if (output.nModified >= 1 && output.ok == 1) {
            return Response.success(res, {
              message: "Team registered."
            })
          }
        }
      }
      return Response.failed(res, { message: "Couldn't update event." })
    }
    return Response.failed(res, {
      message: "No such team in records."
    })
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}

const updateEvent = async (req, res) => {
  try {
    let id = req.params.id, event
    console.log(req.body)
    event = await Event.findOneAndUpdate({ _id: id }, req.body, { new: true })
    if (!event) {
      return Response.success(res, { message: "No event found." })
    }
    return Response.success(res, {
      message: "Event updated.",
      event: event
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const updateCar = async (req, res) => {
  try {
    let id = req.params.id,
      team_id = req.params.team_id,
      event, team, car
    if (req.body.car_number != null) {
      car = await Car.findOneAndUpdate({ team_id: team_id, event_id: id }, { car_number: req.body.car_number }, { upsert: true, new: true })
      if (car) {
        return Response.success(res, {
          message: "Updated car.",
          car: car
        })
      }
      return Response.failed(res, { message: "Car not found!" })
    }
    return Response.failed(res, { message: "Provide a valid car number." })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const updateAnnouncement = async (req, res) => {
  let announcement, annc_id = req.params.annc_id, body = req.body, update_body
  try {
    update_body = {
      dateTime: body.dateTime,
      author: body.author,
      title: body.title,
      description: body.description,
      author: body.author,
      tags: body.tags
    }
    announcement = await Announcement.findOneAndUpdate({ _id: annc_id }, update_body, { new: true })
    if (announcement) {
      return Response.success(res, { message: "Updated announcement.", announcement })
    }
    return Response.failed(res, { message: "Couldn't update announcement." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}

const updateLiveTiming = async (req, res) => {
  let live_timing, lt_id = req.params.lt_id, update_body
  try {
    update_body = {
      event_name: req.body.event_name,
      lap_number: req.body.lap_number,
      lap_time: req.body.lap_time,
      driver_initial: req.body.driver_initial
    }
    live_timing = await LiveTiming.findOneAndUpdate({ _id: lt_id }, update_body, { new: true })
    if (live_timing) {
      return Response.success(res, { live_timing: live_timing, message: "Updated live timing." })
    }
    return Response.failed(res, { message: "Couldn't update live timing." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}
const updateSchedule = async (req, res) => {
  let schedule, sc_id = req.params.sc_id, update_body
  try {
    update_body = {
      day_number: req.body.day_number,
      day: req.body.day,
      date: req.body.date,
      activity: req.body.activity,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      location: req.body.location,
      comments: req.body.comments,
      volunteer_view: req.body.volunteer_view,
      participant_view: req.body.participant_view,
      visitor_view: req.body.visitor_view
    }
    schedule = await Schedule.findOneAndUpdate({ _id: sc_id }, update_body, { new: true })
    if (schedule) {
      return Response.success(res, { schedule: schedule })
    }
    return Response.failed(res, { message: "Couldn't update schedule." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}
const updateStaticSchedule = async (req, res) => {
  let static_schedule, st_id = req.params.st_id, update_body
  try {
    update_body = {
      business: {
        queue: req.body.business_queue,
        start_time: req.body.business_start_time,
        end_time: req.body.business_end_time
      },
      cost: {
        queue: req.body.cost_queue,
        start_time: req.body.cost_start_time,
        end_time: req.body.cost_end_time
      },
      design: {
        queue: req.body.design_queue,
        start_time: req.body.design_start_time,
        end_time: req.body.design_end_time
      }
    }
    static_schedule = await StaticSchedule.findOneAndUpdate({ _id: st_id }, update_body, { new: true })
    if (static_schedule) {
      return Response.success(res, { static_schedule })
    }
    return Response.failed(res, { message: "Couldn't update statuc schedule." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}
const updateTechUpdate = async (req, res) => {
  let tech_update, tu_id = req.params.tu_id, update_body
  try {
    tech_update = await TechUpdate.findOne({ _id: tu_id }).populate('team').exec()
    if (tech_update) {
      tech_update.accumulator = tech_update.team.category === 'electric' ? req.body.accumulator : false
      tech_update.scrutineering_elec = tech_update.team.category === 'electric' ? req.body.scrutineering_elec : false
      tech_update.scrutineering_mech = req.body.scrutineering_mech
      tech_update.driver_egress = req.body.driver_egress
      tech_update.tilt = req.body.tilt
      tech_update.noise_ready_to_drive_sound = req.body.noise_ready_to_drive_sound
      tech_update.brakes = req.body.brakes
      tech_update.rain = req.body.rain
      let saved = await tech_update.save()
      if (saved) {
        return Response.success(res, { message: "Updated tech update." })
      }
    }
    return Response.failed(res, { message: "Couldn't update tech update." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}

const deleteEvent = async (req, res) => {
  try {
    let id = req.params.id,
      event = await Event.findOneAndDelete({ _id: id })
    if (!event) {
      return Response.success(res, {
        message: "Couldn't delete event."
      })
    }
    return Response.success(res, {
      deleted_event: event
    })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}

const deleteAnnouncement = async (req, res) => {
  let annc_id = req.params.annc_id, announcement, event_id = req.params.id, event
  try {
    announcement = await Announcement.findOneAndDelete({ _id: annc_id })
    if (announcement) {
      return Response.success(res, { message: "Deleted announcement." })
    }
    return Response.failed(res, { message: "Couldn't delete announcement." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}

const deleteLiveTiming = async (req, res) => {
  let id = req.params.id,
    lt_id = req.params.lt_id,
    event, live_timing
  try {
    event = await Event.findOne({ _id: id })
    if (event) {
      live_timing = await LiveTiming.findOneAndDelete({ _id: lt_id })
      if (live_timing) {
        event.live_timings.pull(live_timing._id)
        let saved = await event.save()
        if (saved) {
          return Response.success(res, { message: `Successfully deleted live timing ${live_timing._id}` })
        }
      }
      return Response.failed(res, { message: "Couldn't delete live timing." })
    }
    return Response.failed(res, { message: "Event not found." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, "Internal server error.")
  }
}
const deleteSchedule = async (req, res) => {
  let schedule, event, id = req.params.id, sc_id = req.params.sc_id
  try {
    event = await Event.findOne({ _id: id })
    if (event) {
      schedule = await Schedule.findOneAndDelete({ _id: sc_id })
      if (schedule) {
        event.schedules.pull(schedule._id)
        let saved = await event.save()
        if (saved) {
          return Response.success(res, { message: "Deleted schedule." })
        }
      }
    }
    return Response.failed(res, { message: "Couldn't delete schedule." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}
const deleteTechUpdate = async (req, res) => {
  let techupdt, event, id = req.params.id, tu_id = req.params.tu_id
  try {
    event = await Event.findOne({ _id: id })
    if (event) {
      techupdt = await TechUpdate.findOneAndDelete({ _id: tu_id })
      if (techupdt) {
        event.tech_updates.pull(techupdt._id)
        let saved = await event.save()
        if (saved) {
          return Response.success(res, { message: "Deleted tech update." })
        }
      }
    }
    return Response.failed(res, { message: "Couldn't delete tech update." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}
const deleteStaticSchedule = async (req, res) => {
  let st_schedule, event, id = req.params.id, st_id = req.params.st_id
  try {
    event = await Event.findOne({ _id: id })
    if (event) {
      st_schedule = await StaticSchedule.findOneAndDelete({ _id: st_id })
      if (st_schedule) {
        let team = await Team.findOne({ _id: st_schedule.team })
        if (team) {
          await event.static_schedule.pull(st_id)
          await team.static_schedules.pull(st_id)
          let saved_e = await event.save()
          let saved_t = await team.save()
          if (saved_e && saved_t) {
            return Response.success(res, { message: "Removed static schedule." })
          }
        }
        return Response.failed(res, { message: "Couldn't find team." })
      }
      return Response.failed(res, { message: "Couldn't delete static schedule." })
    }
    return Response.failed(res, { message: "Couldn't find event." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}
const unlinkTeamFromEvent = async (req, res) => {
  let team, event, team_id, event_id, deleted = false
  try {
    team = await Team.findOne({ _id: team_id })
    event = await Event.findOne({ _id: event_id })
    if (team && event) {
      let out1 = await team.updateOne({ $pull: { events: event._id } })
      let out2 = await event.updateOne({ $pull: { teams: team._id } })
      if (out1.nModified >= 1 && out1.ok == 1 && out2.nModified >= 1 && out2.ok == 1) {
        return Response.success(res, { message: "Unlinked team and event." })
      }
      return Response.failed(res, { message: "Couldn't unlink team and event." })
    }
    return Response.failed(res, { message: "Not found." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." })
  }
}

module.exports = {
  getAllEvents,
  getOneEvent,
  getOneEventByName,
  getTeamForEvent,
  getAnnouncementsForEvent,
  getOneAnnouncement,
  getOneTechupdate,
  getOneSchedule,
  getOneLivetiming,
  getOneStaticSchedule,
  getAllTechupdates,
  getAllSchedules,
  getAllLivetimings,
  getAllCars,
  getAllStaticSchedulesForEvent,
  getAllStaticSchedulesForTeam,
  getOneStaticScheduleEventTeam,
  getTeamCar,
  createEvent,
  createAnnouncement,
  createCar,
  createLivetiming,
  createTechupdate,
  createSchedule,
  createStaticSchedule,
  addTeam,
  updateEvent,
  updateAnnouncement,
  updateLiveTiming,
  updateTechUpdate,
  updateSchedule,
  updateStaticSchedule,
  updateCar,
  deleteEvent,
  deleteAnnouncement,
  deleteLiveTiming,
  deleteSchedule,
  deleteTechUpdate,
  deleteStaticSchedule,
  unlinkTeamFromEvent,
}