const User = require('./../models/user.model')
const Team = require('./../models/team.model')
const Event = require('./../models/event.model')
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
      return Response.success(res, { teams: teams })
    }
    return Response.success(res, { message: "No teams found." })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getTeamExpandUser = async function (req, res) {
  try {
    let id = req.params.id
    let team = await Team.findOne({ _id: id }).populate('users').exec()
    if (!team) {
      return Response.failed(res, { message: "No such team found." })
    }
    return Response.success(res, { message: "Team found.", team })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const getOneMini = async function (req, res) {
  try {
    let id = req.params.id
    let team = await Team.findOne({ _id: id })
    if (!team) {
      return Response.failed(res, { message: "No such team found." })
    }
    return Response.success(res, { message: "Team found.", team })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const getOne = async function (req, res) {
  try {
    let id = req.params.id
    let team = await Team.findOne({ _id: id }).populate(['users', 'events', 'alumnus', 'static_schedules']).exec()
    if (!team) {
      return Response.failed(res, { message: "No such team found." })
    }
    return Response.success(res, { team })
  } catch (error) {
    return res.sendStatus(500)
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
        car: car._id,
        users: [req.user._id],
        captain: req.user._id,
        logo: body.logo_url
      }
      let team = await new Team(newTeam).save()
      if (team) {
        let output = await User.findOneAndUpdate({ _id: req.user._id }, { team: team._id })
        await car.updateOne({ team_id: team._id })
        if (output) {
          if (body.user_emails) {
            for (let i = 0; i < (body.user_emails).length; i++) {
              let token = await new Token({
                user_id: users[i],
                team_id: team._id,
                token: crypto.randomBytes(16).toString('hex')
              }).save()
              if (token) {
                let genLink = req.protocol + '://' + req.headers.host + '\/api\/team\/confirmation\/' + token.token + '\n'
                let teamLink = req.protocol + '://' + req.headers.host + '\/team\/' + team._id;
                let mailOptions = {
                  from: 'MEC Support',
                  to: emails[i],
                  subject: `Team Invitiation for ${team.team_name}`,
                  generateTextFromHTML: true,
                  html: `<p>Hey <strong>${user.display_name},</strong></p><p>You have been invited to join the team <a href="${teamLink}" target="_blank">${team.team_name}</a></p><p>Click on the <a href="${genLink}">link</a> to join.</p>.`
                }
                let success = await smtpTransport.sendMail(mailOptions)
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
  let id = req.params.id, body = req.body
}

const changeCaptain = async (req, res) => {
  let id = req.params.id, user = req.body.new_captain, team, find_user
  try {
    team = await Team.findOne({ _id: id })
    if (team) {
      find_user = await User.findOne({ _id: user })
      if (find_user) {
        if (team.users.contains(find_user._id)) {
          let team_out = await team.updateOne({ captain: find_user._id })
          if (team_out.nModified >= 1 && team_out.ok == 1) {
            return Response.success(res, {
              message: 'Updated captain',
            })
          }
        }
        return Response.failed(res, { message: "Couldn't update." })
      }
    }
    return Response.failed(res, { message: "Not found" })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const addMembers = async function (req, res) {
  let id = req.params.id, team, successful_sent = [], emails = req.body.emails, users = req.body.users
  try {
    team = await Team.findOne({ _id: id })
    if (team) {
      if (emails) {
        for (let i = 0; i < users.length; i++) {
          let user = await User.findOne({ _id: users[i]._id })
          if (user) {
            let token = await new Token({
              user_id: user._id,
              team_id: team._id,
              token: crypto.randomBytes(16).toString('hex'),
              for: 'member'
            }).save()
            if (token) {
              let genLink = req.protocol + '://' + req.headers.host + '\/api\/team\/confirmation\/' + token.token + '\n'
              let teamLink = req.protocol + '://' + req.headers.host + '\/team\/' + team._id;
              let mailOptions = {
                from: 'MEC Support',
                to: emails[i],
                subject: `Team Invitiation for ${team.team_name}`,
                generateTextFromHTML: true,
                html: `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style type="text/css">#outlook a{padding:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}.ExternalClass *{line-height:100%}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}p{display:block;margin:13px 0}</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px){@-ms-viewport{width:320px}@viewport{width:320px}}</style><link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Lato);@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><style type="text/css">@media only screen and (min-width:480px){.mj-column-per-100{width:100% !important}}</style></head><body style="background: #FFFFFF;"><div class="mj-container" style="background-color:#FFFFFF;"><table role="presentation" cellpadding="0" cellspacing="0" style="background:#33CBCC;font-size:0px;width:100%;" border="0"><tbody><tr><td><div style="margin:0px auto;max-width:600px;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;"><div style="font-size:1px;line-height:50px;white-space:nowrap;">&#xA0;</div></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:600px;"><img alt="" title="" height="auto" src="https://mobilityeng.online/_nuxt/img/ecad00c.jpg" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:100%;height:auto;" width="600"></td></tr></tbody></table></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"><div style="cursor:auto;color:#FFFFFF;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;"><p><span style="font-size:16px;">Hey&#xA0;<strong>${user.display_name}</strong></span></p></div></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"><div style="cursor:auto;color:#FFFFFF;font-family:Lato, Tahoma, sans-serif;font-size:14px;line-height:22px;text-align:center;"><h2 style="color: #757575; line-height: 100%;"><span style="color:#ffffff;">You have been invited to join <a href="${teamLink}" target="_blank" style="color: #fffe00;">${team.team_name}</a>&#xA0;</span></h2></div></td></tr><tr><td style=" word-wrap:break-word;font-size:0px;padding:45px 0px 45px 0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%;" align="center" border="0"><tbody><tr><td style="border:0px solid #000;border-radius:5px;color:#FFFFFF;cursor:auto;padding:16px 48px;" align="center" valign="middle" bgcolor="#FEA114"> <a href="${genLink}" style="text-decoration:none;background:#FEA114;color:#FFFFFF;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:24px;font-weight:normal;line-height:120%;text-transform:none;margin:0px;" target="_blank">JOIN</a></td></tr></tbody></table></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"><div style="cursor:auto;color:#FFFFFF;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;"><p><span style="font-size:16px;"><small>Copyright &#xA9; 2018&#xA0;<a draggable="false" href="http://mobilityeng.in/" rel="noreferrer" style="text-decoration: none;" target="_blank"> <span style="color:#fffe00;"> Mobility Engineering Consortium Pvt. Ltd.</span> </a>&#xA0;All Rights Reserved.</small></span></p></div></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table></div></body></html>`
              }
              let success = await smtpTransport.sendMail(mailOptions)
              if (success) {
                successful_sent.push(user.email)
              }
            }
          }
        }
        return Response.success(res, { message: `Sent team invitation`, successful_emails: successful_sent })
      }
      return Response.failed(res, { message: "No emails entered." })
    }
    return Response.failed(res, { message: "Team not found." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal Server Error" }, 500)
  }
}

const confirmToken = async function (req, res, next) {
  let _token = req.params.token, user, team, token, user_out, user_updated = false, team_out, team_updated = false, message, success = false
  try {
    token = await Token.findOne({ token: _token })
    if (token) {
      user = await User.findOne({ _id: token.user_id })
      if (user) {
        team = await Team.findOne({ _id: token.team_id })
        if (team) {
          if (token.for == 'member') {
            if (user.team == team._id) {
              user_updated = true
            } else {
              user_out = await user.updateOne({ team: team._id })
              if (user_out.nModified >= 1 && user_out.ok == 1) {
                user_updated = true
              }
            }
            if (team.users.indexOf(user._id) > -1) {
              team_updated = true
            } else {
              team_out = await team.updateOne({ $push: { users: user._id } })
              if (team_out.nModified >= 1 && team_out.ok == 1) {
                team_updated = true
              }
            }
            if (user_updated && team_updated) {
              await Token.deleteOne({ _id: token._id })
              success = true
              message = "Successfully joined team."
            } else {
              message = "Try again."
            }
          } else if (token.for == 'alumni') {
            if (user.team == team._id) {
              user_updated = true
            } else {
              // Link user to team
              user.team = team._id
              // update user role to alumni (push)
              user.role.push('alumni')
              // Add user._id to team.alumnus
              team.alumnus.push(user._id)

              let savedT = await team.save()
              let savedU = await user.save()
              if (savedU) {
                user_updated = true
              }
              if (savedT) {
                team_updated = true
              }
              if (user_updated && team_updated) {
                await Token.deleteOne({ _id: token._id })
                success = true
                message = "Successfully joined team."
              } else {
                message = "Try again."
              }
            }
          }
          else {
            message = "Invalid token."
          }
        } else {
          message = "Invalid token."
        }
      } else {
        message = "Invalid token."
      }
    } else {
      message = "Invalid token."
    }
    res.locals.success = success
    res.locals.message = message
    return next();
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal Server Error" }, 500)
  }
}

const addAlumnus = async function (req, res) {
  let id = req.params.id, team, successful_sent = [], emails = req.body.emails, users = req.body.users
  team = await Team.findOne({ _id: id })
  if (team) {
    if (emails) {
      for (let i = 0; i < users.length; i++) {
        let user = await User.findOne({ _id: users[i]._id })
        if (user) {
          let token = await new Token({
            user_id: user._id,
            team_id: team._id,
            token: crypto.randomBytes(16).toString('hex'),
            for: 'alumni'
          }).save()
          if (token) {
            let genLink = req.protocol + '://' + req.headers.host + '\/api\/team\/confirmation\/' + token.token + '\n'
            let teamLink = req.protocol + '://' + req.headers.host + '\/team\/' + team._id;
            let mailOptions = {
              from: 'MEC Support',
              to: emails[i],
              subject: `Team Invitiation for ${team.team_name}`,
              generateTextFromHTML: true,
              html: `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style type="text/css">#outlook a{padding:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}.ExternalClass *{line-height:100%}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}p{display:block;margin:13px 0}</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px){@-ms-viewport{width:320px}@viewport{width:320px}}</style><link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Lato);@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><style type="text/css">@media only screen and (min-width:480px){.mj-column-per-100{width:100% !important}}</style></head><body style="background: #FFFFFF;"><div class="mj-container" style="background-color:#FFFFFF;"><table role="presentation" cellpadding="0" cellspacing="0" style="background:#33CBCC;font-size:0px;width:100%;" border="0"><tbody><tr><td><div style="margin:0px auto;max-width:600px;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;"><div style="font-size:1px;line-height:50px;white-space:nowrap;">&#xA0;</div></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:600px;"><img alt="" title="" height="auto" src="https://mobilityeng.online/_nuxt/img/ecad00c.jpg" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:100%;height:auto;" width="600"></td></tr></tbody></table></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"><div style="cursor:auto;color:#FFFFFF;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;"><p><span style="font-size:16px;">Hey&#xA0;<strong>${user.display_name}</strong></span></p></div></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"><div style="cursor:auto;color:#FFFFFF;font-family:Lato, Tahoma, sans-serif;font-size:14px;line-height:22px;text-align:center;"><h2 style="color: #757575; line-height: 100%;"><span style="color:#ffffff;">You have been invited to join <a href="${teamLink}" target="_blank" style="color: #fffe00;">${team.team_name}</a>&#xA0;</span></h2></div></td></tr><tr><td style=" word-wrap:break-word;font-size:0px;padding:45px 0px 45px 0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%;" align="center" border="0"><tbody><tr><td style="border:0px solid #000;border-radius:5px;color:#FFFFFF;cursor:auto;padding:16px 48px;" align="center" valign="middle" bgcolor="#FEA114"> <a href="${genLink}" style="text-decoration:none;background:#FEA114;color:#FFFFFF;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:24px;font-weight:normal;line-height:120%;text-transform:none;margin:0px;" target="_blank">JOIN</a></td></tr></tbody></table></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"><div style="cursor:auto;color:#FFFFFF;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;"><p><span style="font-size:16px;"><small>Copyright &#xA9; 2018&#xA0;<a draggable="false" href="http://mobilityeng.in/" rel="noreferrer" style="text-decoration: none;" target="_blank"> <span style="color:#fffe00;"> Mobility Engineering Consortium Pvt. Ltd.</span> </a>&#xA0;All Rights Reserved.</small></span></p></div></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table></div></body></html>`
            }
            let success = await smtpTransport.sendMail(mailOptions)
            if (success) {
              successful_sent.push(user.email)
            }
          }
        }
      }
      return Response.success(res, { message: `Sent team invitation`, successful_emails: successful_sent })
    }
    return Response.failed(res, { message: "No emails entered." })
  }
  return Response.failed(res, { message: "Team not found." })
}

const removeMembers = async function (req, res) {
  let team_id = req.params.id, user_id = req.params.user_id, user = {}, team = {}, updatedTeam, updatedUser
  try {
    team = await Team.findOne({ _id: team_id })
    if (team) {
      user = await User.findOne({ _id: user_id })
      if (user) {
        if (team._id == user.team) {
          user.team = null
        }
        updatedUser = await user.save()
        // Pull role if alumni
        team.users.pull(user._id)
        updatedTeam = await team.save()
        if (updatedTeam && updatedUser) {
          return Response.success(res, { message: "Removed member." })
        }
        return Response.failed(res, { message: "Couldn't remove member." })
      }
    }
    return Response.failed(res, { message: "Not found" })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." }, 500)
  }
}

const removeAlumnus = async function (req, res) {
  let team_id = req.params.id, user_id = req.params.user_id, user = {}, team = {}, updatedTeam, updatedUser
  try {
    team = await Team.findOne({ _id: team_id })
    if (team) {
      user = await User.findOne({ _id: user_id })
      if (user) {
        if (String(team._id) == String(user.team)) {
          user.team = null
        }
        user.role.pull('alumni')
        updatedUser = await user.save()
        // Pull role if alumni
        team.alumnus.pull(user._id)
        updatedTeam = await team.save()
        if (updatedTeam && updatedUser) {
          return Response.success(res, { message: "Removed member." })
        }
        return Response.failed(res, { message: "Couldn't remove member." })
      }
    }
    return Response.failed(res, { message: "Not found" })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal server error." }, 500)
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
          let output = await user.updateOne({ team: team_id }, { new: true })
          if (output.nModified >= 1 && output.ok == 1) {
            user2team = true
          }
        }
        // Team 2 User
        if (team.users.indexOf(user._id) > -1) {
          team2user = true
        } else {
          let output = await team.updateOne({ $push: { users: user._id } }, { new: true })
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
          let output = await event.updateOne({ $push: { teams: team_id } }, { new: true })
          if (output.nModified >= 1 && output.ok == 1) {
            event2team = true
          }
        }
        if (team.events.indexOf(event._id) > -1) {
          team2event = true
        } else {
          let output = await team.updateOne({ $push: { events: event._id } }, { new: true })
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
          let output = await car.updateOne({ team: team._id })
          if (output.nModified >= 1 && output.ok == 1) {
            car2team = true
          }
        }
        if (team.car == car._id) {
          team2car = true
        }
        else {
          let output = await team.updateOne({ car: car._id })
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

const unlinkTeamAndEvent = async (req, res) => {
  try {
    let team, team_id = req.params.id, event, event_id = req.params.event_id
    team = await Team.findOne({_id: team_id})
    event = await Event.findOne({_id: event_id})
    if (team && event) {
      // Check if they are linked
      if(team.events.contains(event._id)){
        let out1 = await team.updateOne({$pull: { "events": event._id }})
      } 
      if(event.teams.contains(team._id)){
        let out2 = await event.updateOne({$pull: { "teams": team._id }})
      }
      if(out1.ok && out2.ok && (out1.nModified >= 0 || out2.nModified >= 0)) {
        return Response.success(res, {message: "Team and event unlinked."})
      }
    }
    return Response.failed(res, {message: "Couldn't remove."}, 404)
  } catch (err) {
    console.log(err)
    return res.sendStatus(500) 
  }
}

module.exports = {
  getAll,
  getOneMini,
  getTeamExpandUser,
  getOne,
  create,
  linkTeamAndUser,
  confirmToken,
  addMembers,
  addAlumnus,
  removeMembers,
  removeAlumnus,
  linkTeamAndEvent,
  linkTeamAndCar,
  unlinkTeamAndEvent,
  updateTeam,
  changeCaptain,
  deleteTeam
}