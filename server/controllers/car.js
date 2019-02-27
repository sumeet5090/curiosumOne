const Event = require('./../models/event.model')
const Car = require('./../models/car.model')
const Team = require('./../models/team.model')
const Response = require('./../services/response')
const getAll = async (req, res) => {
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
const getForTeam = async (req, res) => {
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
const create = async (req, res) => {
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
const update = async (req, res) => {
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
const remove = async (req, res) => {
  try{

  } catch(err){

  }
}
module.exports = {
  getAll,
  getForTeam,
  create,
  update,
  remove
}