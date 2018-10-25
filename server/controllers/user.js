const User = require('./../models/user.model')
const helper = require('./../auth/helper')
const Response = require('./../services/response')

const getAll = async function (req, res) {
  try {
    let users = await User.find(), correctedUsers = [];
    if ((users.length > 0)) {
      users.forEach(user => {
        correctedUsers.push(user.toWeb())
      });
      return Response.success(res, { users: correctedUsers })
    }
    return Response.success(res, { message: "No users found." })
  } catch (error) {
    console.log(error)
    return Response.failed(res, { message: "Internal Server Error" })
  }
}

const getOne = async function (req, res) {
  try {
    let id = req.params.id
    let user = await User.findOne({ _id: id })
    if (!user) {
      return Response.success(res, { message: "No such user found." })
    }
    return Response.success(res, { user: user.toWeb() })
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" })
  }
}

const getByUsername = async function (req, res) {
  try {
    let username = req.params.username
    let user = await User.findOne({ username: username })
    if (!user) {
      return Response.success(res, { message: "No such user found." })
    }
    return Response.success(res, { user: user.toWeb() })
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" })
  }
}

const getTeam = async function (req, res) {
  try {
    let id = req.params.id
    let user = await User.findOne({ _id: id })
    if (!user) {
      return Response.failed(res, { message: "No such user found." })
    }
    if (!user.team) {
      return Response.failed(res, { message: "User has no team." });
    }
    return Response.success(res, { team: user.team })
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" })
  }
}

const getTeamByUsername = async function (req, res) {
  try {
    let username = req.params.username
    let user = await User.findOne({ username: username })
    if (!user) {
      return Response.failed(res, { message: "No such user found." })
    }
    if (!user.team) {
      return Response.failed(res, { message: "User has no team." })
    }
    return Response.success(res, { team: user.team })
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" })
  }
}

const isParticipant = async function (req, res) {
  try {
    console.log("jeff")
  } catch (error) {
    console.log("error " + error)
  }
}

const update = async function (req, res) {
  //  Put request
  let id = req.user._id
  try {
    let user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true })
    if (!user) {
      return Response.failed(res, { message: "Couldn't update user." })
    }
    return Response.success(res, { message: "Updated profile.", user })
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" })
  }
}

const remove = async function (req, res) {
  let id = req.user._id
  try {
    let deletedUser = await User.findOneAndRemove({ _id: id })
    if (!deletedUser) {
      return res.send({
        message: "Couldn't Delete User."
      })
    }
    return res.send({
      message: "Deleted User",
      deletedUser
    })
  } catch (error) {
    return Response.failed(res, { message: "Internal Server Error" })
  }
}

module.exports = {
  getAll,
  getOne,
  getByUsername,
  update,
  remove,
  getTeam,
  getTeamByUsername,
  isParticipant
}