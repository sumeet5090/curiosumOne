const User = require('./../models/user.model')
const Team = require('./../models/team.model')
const Car = require('./../models/car.model')
const Token = require('./../models/token.model')
const Response = require('./../services/response')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_ID,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        accessToken: process.env.GMAIL_ACCESS_TOKEN,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN
    }
})

const getAll = async function (req, res) {
  try {
    let teams = await Team.find();
    if (teams.length > 0) {
      return Response.success(res, { teams: teams }, 302)
    }
    return Response.success(res, { message: "No teams found." }, 204)
  } catch (error) {
    console.log(error)
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
    let users = body.user_ids;
    let car = await new Car({
      car_number: body.car_number || 1
    }).save()
    if (car) {
      let newTeam = {
        category: body.category || 'combustion',
        team_name: body.team_name,
        bio: body.team_bio,
        institution: body.institution,
        location: body.location,
        country: body.country,
        website_url: body.website_url,
        social: body.social,
        car_id: car._id,
        users: [req.user._id],
        captain_id: req.user._id
      }
      let team = await new Team(newTeam).save()
      if (team) {
        let output = await User.findOneAndUpdate({_id: req.user._id}, { team: team._id })
        await car.updateOne({team_id: team._id}).exec()        
        if (output) {
          if (body.user_emails) {
            for (let i = 0; i < (body.user_emails).length; i++) {
              let token = await new Token({
                user_id: users[i],
                team_id: team._id,
                token: crypto.randomBytes(16).toString('hex')
              }).save()
              if (token) {
                let genLink = 'http://' + req.headers.host + '\/api\/team\/confirmation\/' + token.token + '\n'
                let teamLink = 'https://'+req.headers.host+'\/team\/'+team._id;
                let mailOptions = {
                  from: 'MEC Support',
                  to: body.user_emails[i],
                  subject: `Team Invitiation for <${team.team_name}>`,
                  generateTextFromHTML: true,
                  html: `Hey <strong>${body.user_emails[i]},</strong><br/><p>You have been invited to join the team <a href="${teamLink}">${team.team_name}</a></p><br/><p>Click on the <a href="${genLink}">link</a> to join.</p>.`
                }
                await smtpTransport.sendMail(mailOptions)
              }
            }
          }
          return res.send({ message: "Created new team" })
        }
      }
    }
    return res.sendStatus(304)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const addCaptain = async (req, res) => {
  let id = req.params.team_id, team, captain

}

const addTeamMembers = async function (req, res) {
  let id = req.params.team_id, team, user, users
}

const confirmToken = async function (req, res) {
  let _token = req.params.token, user, team, token, user_out, user_updated = false, team_out, team_updated = false
  try {
    token = await Token.findOne({ token: _token })
    if (token) {
      user = await User.findOne({ _id: token.user_id })
      if (user) {
        team = await Team.findOne({ _id: token.team_id })
        if (team) {
          if (user.team == team._id) {
            user_updated = true
          } else {
            user_out = await user.updateOne({ team: team._id }).exec()
            if (user_out.nModified >= 1 && user_out.ok == 1) {
              user_updated = true
            }
          }
          if (team.users.indexOf(user._id) > -1) {
            team_updated = true
          } else {
            team_out = await team.updateOne({ $push: { users: user._id } }).exec()
            if (team_out.nModified >= 1 && team_out.ok == 1) {
              team_updated = true
            }
          }
          if (user_updated && team_updated) {
            await Token.deleteOne({ _id: token._id })
            return Response.success(res, { message: "Successfully joined team." }, 202)
          }
          return Response.success(res, { message: "Try again." }, 202)
        }
      }
    }
    return Response.failed(res, { message: "Invalid token" })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal Server Error" }, 500)
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
    return Response.failed(res, { message: "Internal Server Error" }, 500)
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

const linkTeamAndCar = async (req, res) => {
  try {
    let car2team = false, team2car = false
    let team = await Team.findOne({ _id: req.params.id })
    if (team) {
      let car = await Car.findOne({ _id: req.params.car_id })
      if (car) {
        if (car.team_id == team._id) {
          car2team = true
        } else {
          let output = await car.updateOne({ team: team._id }).exec()
          if (output.nModified >= 1 && output.ok == 1) {
            car2team = true
          }
        }
        if (team.car_id == car._id) {
          team2car = true
        }
        else {
          let output = await team.updateOne({ car_id: car._id }).exec()
          if (output.nModified >= 1 && output.ok == 1) {
            team2car = true
          }
        }
        if (team2car && car2team) {
          return res.send({
            message: "Successfully linked team and car."
          })
        }
        return res.send({
          message: "Couldn't link team and car."
        })
      }
      return res.sendStatus(404)
    }
    return res.sendStatus(404)
  } catch (err) {
    return res.sendStatus(500)
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  linkTeamAndUser,
  confirmToken,
  linkTeamAndEvent,
  linkTeamAndCar,
  updateTeam,
  deleteTeam
}