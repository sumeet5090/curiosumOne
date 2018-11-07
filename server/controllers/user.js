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

const getOneByEmail = async function (req, res) {
  try {
    let user_email = req.params.email, user
    user = await User.findOne({email: user_email})
    if(!user){
      return res.send({
        success: false,
        user: {}
      })
    }
    return res.send({
      success: true,
      user: user
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
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

const getNotifications = async function (req, res) {
  try {
    let user_id = req.params.id, user, notifications
    user = await User.findOne({_id: user_id})
    if(user){
      return res.send({
        success: true,
        notifications: user.notifications
      })
    }
    return res.send({
      success: false,
      message: 'User not found'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: "Internal Server Error."
    })
  }
}

const inviteTeam = async function (req, res)  {
  try{
    let user, notification, body = req.body, user_email = req.params.email
    user = await User.findOne({email: user_email})
    if(user){
      notification = {
        text: req.body.notification_text,
        team_invite: req.body.notification_link,
      }
      user.updateOne({$push: {notifications: notification}}).exec()
    }
  }catch(error){

  }
}

const createBatchNotifications = async function (req, res)  {
  
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
  getOneByEmail,
  getByUsername,
  getTeam,
  getTeamByUsername,
  isParticipant,
  getNotifications,
  inviteTeam,
  createBatchNotifications,
  update,
  remove,
}