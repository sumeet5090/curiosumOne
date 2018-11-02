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
      }
    }).save()
    if(!team){
      return Response.success(res, { message: "Couldn't create team" }, 204)
    }
    return Response.success(res, { message: "Created new team" }, 203)
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

module.exports = {
  getAll,
  getOne,
  create,
  updateTeam,
  deleteTeam
}