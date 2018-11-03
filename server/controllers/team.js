const Team = require('./../models/team.model')

const Response = require('./../services/response')

const getAll = async function (req, res) {
  try {
    let teams = await Team.find(), correctedTeams;
    if (!(teams.length > 0)) {
      teams.forEach(team => {
        correctedTeams.push(team.toWeb())
      });
      return Response.success(res, { teams: correctedTeams }, 302)
    }
    return Response.success(res, { message: "No teams found." }, 204)
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" }, 500)
  }
}

const getOne = async function (req, res) {
  try {
    let id = req.params.id
    let team = await Team.findOne({ _id: id }).populate('users').populate('events').exec()
    if (!team) {
      return Response.success(res, { message: "No such team found." }, 204)
    }
    return Response.success(res, { team }, 302)
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" }, 500)
  }
}

const create = async function (req, res) {
  let body = req.body
  try {
    let users = []
    (req.body.users_list.split(',')).forEach(user => {
      users.push(user)
    })
    let getUser = await User.findOne({_id: req.user})
    if(getUser.team){
      return res.sendStatus(405)
    }
    let team = await new Team({
      category: body.category || 'combustion',
      car_number: body.car_number,
      team_name: body.team_name,
      bio: body.team_bio,
      institution: {
        name: body.institution_name,
        address: body.institution_address,
        short_name: body.institution_short_name
      },
      location: body.location,
      country: body.country,
      website_url: body.website_url,
      social: {
        facebook: body.facebook_url,
        twitter: body.twitter_url,
        instagram: body.instagram_url
      },
      captain_id: req.user,
      users: users
    }).save()
    if (!team) {
      return res.sendStatus(304)
    }
    let output = await getUser.updateOne({team: team._id}).exec()
    if (output.nModified >= 1 && output.ok == 1) {
      return res.send({ message: "Created new team" })
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const updateTeam = async function (req, res) {
  // Put request
  let id = req.params.id
  try {
    let team = await Team.findOneAndUpdate({ _id: id }, req.body, { new: true })
    if (!team) {
      return Response.success(res, { message: "Couldn't update team." }, 204)
    }
    return Response.success(res, { message: "Updated team.", team }, 204)
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" }, 204)
  }
}

const deleteTeam = async function (req, res) {
  let id = req.params.id
  try {
    let deletedTeam = await Team.findOneAndRemove({ _id: id })
    if (!deletedTeam) {
      return res.send({
        message: "Couldn't Delete Team."
      })
    }
    return res.send({
      message: "Deleted Team",
      deletedTeam
    })
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" }, 204)
  }
}
const linkTeamAndUser = async (req, res) => {
  try {
    let team_id, username, team, user, user_list, team2user = false, user2team = false
    team_id = req.params.id
    username = req.params.username
    team = await Team.findOne({ _id: team_id })
    if (team) {
      user = await User.findOne({ _id: username })
      if (user) {
        // User 2 Team
        if (String(user.team) == String(team._id)) {
          user2team = true
        } else {
          let output = await user.updateOne({ team: team_id }, { new: true }).exec()
          if (output.nModified >= 1 && output.ok == 1) {
            user2team = true
          }
        }
        // Team 2 User
        if (team.users.indexOf(user._id) > -1) {
          team2user = true
        } else {
          let output = await team.updateOne({ $push: { users: user._id } }, { new: true }).exec()
          if (output.nModified >= 1 && output.ok == 1) {
            team2user = true
          }
        }
        if (team2user && user2team) {
          return res.send({
            message: "Successfully linked team and events."
          })
        } return res.send({
          message: "Couldn't link team and event."
        })
      }
      return res.sendStatus(404)
    }
    return res.sendStatus(404)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const linkTeamAndEvent = async (req, res) => {
  try {
    let team_id = req.params.id,
      event_id = req.params.event_id,
      team, event, event_list, team2event = false, event2team = false
    team = await Team.findOne({ _id: team_id })
    if (team) {
      event = await Event.findOne({ _id: event_id })
      if (event) {
        if (event.teams.indexOf(team_id) > -1) {
          event2team = true
        } else {
          let output = await event.updateOne({ $push: { teams: team_id } }, { new: true }).exec()
          if (output.nModified >= 1 && output.ok == 1) {
            event2team = true
          }
        }
        if (team.events.indexOf(event._id) > -1) {
          team2event = true
        } else {
          let output = await team.updateOne({ $push: { events: event._id } }, { new: true }).exec()
          if (output.nModified >= 1 && output.ok == 1) {
            team2event = true
          }
        }
        if (team2event && event2team) {
          return res.send({
            message: "Successfully linked team and events."
          })
        } return res.send({
          message: "Couldn't link team and event."
        })
      }
      return res.sendStatus(404)
    }
    return res.sendStatus(404)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  linkTeamAndUser,
  linkTeamAndEvent,
  updateTeam,
  deleteTeam
}