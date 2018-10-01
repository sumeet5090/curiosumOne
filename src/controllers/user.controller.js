let User = require('../models/user.model')
let resService = require('./../services/response.service')

let getUsers = async (req, res) => {
  try {
    let users = await User
      .find()
      .populate('events')
      .populate('team_id')
      .exec()
    if (!users) {
      return resService.error(res, 'No users found.')
    }
    let processedUsers = []
    users.forEach(user => {
      processedUsers.push(user.toWeb())
    });
    return resService.success(res, {
      users: processedUsers
    })
  } catch (err) {
    console.log(err)
    return resService.error(res, err, 500)
  }
}

let getUser = async (req, res) => {
  // TODO: User Profile
  let user_id = req.params.id
  try {
    let user = await User.findOne({
      _id: user_id
    })
    if (!user) {
      return res.send({
        message: "No user found"
      })
    }
    return res.send({
      user: user.toWeb()
    })
  } catch (err) {
    console.log(err)
    return resService.error(res, err, 500)
  }
}
let registerUser = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const body = req.body
  if (!body.email) {
    return resService.error(res, 'Please enter an email to register.')
  } else if (!body.password) {
    return resService.error(res, 'Please enter a password to register.')
  } else {
    try {
      let user = await new User({
        email: body.email,
        password: body.password,
        first_name: body.first_name,
        last_name: body.last_name
      }).save()
      if (!user) {
        return resService.error(res, 'Email already exists.')
      }
      return resService.success(res, {
        message: 'Successfully created user.',
        user: user.toWeb(),
        token: user.getJWT()
      })
    } catch (error) {
      return resService.throwError(error, true)
    }
  }
}
let loginUser = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json')
    let body = req.body
    req
      .checkBody('email', 'Please enter an valid email.')
      .isEmail()
      .notEmpty();
    req
      .checkBody('password', 'Please enter a password.')
      .notEmpty()
    let user = await User.findOne({
      email: body.email
    })
    if (user) {
      user.comparePassword(body.password)
      return resService.success(res, {
        message: "Successfully logged in",
        user: user.toWeb(),
        token: user.getJWT()
      })
    } else {
      return resService.error(res, 'User not found.')
    }
  } catch (error) {
    console.log(error)
    return resService.throwError(error, true)
  }
}
let updateUser = async (req, res) => {
  try {
    let id = req.params.id,
      body = req.body
    let user = await User.findOneAndUpdate({
      _id: id
    }, body, {
      new: true
    })
    if (!user) {
      return resService.error(res, "No such user found.")
    }
    return resService.success(res, {
      updatedUser: user
    })
  } catch (error) {
    return resService.throwError(error, true)
  }
}
let deleteUser = async (req, res) => {
  // // If the option is available??
  try {
    let id = req.params.id,
      deletedUser = await User.findOneAndRemove({
        _id: id
      })
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
    return resService.throwError(error, true)
  }
}
let logOut = async (req, res) => {
  return res.send({
    req
  })
}
module.exports = {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  logOut
}