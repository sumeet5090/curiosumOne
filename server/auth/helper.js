const User = require('./../models/user.model')

Array.prototype.contains = function(element){
  return this.indexOf(element) > -1;
}

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.status(401).send('Unauthorized')
  }
}

const hasRole = (role) => {
  if (!role)
    throw new Error("Required role needs to be set")
  return function (req, res, next) {
    return isAuthenticated(req, res, () => {
      if (req.user && req.user.role){
        if(req.user.role.contains(role)){
          return next()
        }
      }
      return res.sendStatus(403)
    })
  }
}

const isAdmin = () => {
  return hasRole("admin")
}

const isParticipant = () => {
  return hasRole("participant")
}

const isVolunteer = () => {
  return hasRole("volunteer")
}

const linkSocialToAccount = async (opts) => {
  let req = opts.req,
    accessToken = opts.accessToken,
    refreshToken = opts.refreshToken,
    profile = opts.profile,
    done = opts.done,
    provider = opts.provider,
    username = opts.username,
    email = opts.email,
    userData = opts.userData
    console.log(profile)
  if (req.user) {
    let search = {}
    search[`socialLinks.${provider}`] = profile.id
    try {
      let exisitingUser = await User.findOne(search)
      if (exisitingUser) {
        if (exisitingUser._id != req.user._id) {
          return done(null, false)
        }
        return done(exisitingUser)
      }
      let user = await User.findOne({ _id: req.user._id })
      if (!user) {
        return done(null, false)
      }
      user.socialLinks = user.socialLinks || {}
      user.socialLinks[provider] = profile.id
      user.profile = user.profile || {}
      user.profile.picture = user.profile.picture || userData.picture
      user.profile.location = user.profile.location || userData.location
      await user.save()
      return done(null, user)
    } catch (error_out) {
      console.log('Error out' + error_out)
      return done(error_out, false)
    }
  }
  else {
    let search = {}
    search[`socialLinks.${provider}`] = profile.id
    try {
      let existingUser = await User.findOne(search)
      if (existingUser) {
        if (existingUser.status !== 1) {
          return done()
        }
        return done(null, existingUser)
      }
      if (!email) {
        return done(null, false, { message: "No email provided" })
      }
      try {
        let existingEmailUser = await User.findOne({ email: email })
        if (existingEmailUser) {
          if (existingEmailUser.status !== 1) {
            return done(null, false)
          }
          let user = existingEmailUser
          user.socialLinks = user.socialLinks || {}
          user.socialLinks[provider] = profile.id
          user.profile = user.profile || {}
          user.profile.picture = user.profile.picture || userData.picture
          user.profile.location = user.profile.location || userData.location
          let saved = await user.save()
          return done(null, saved)
        }
        let user = new User({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: email,
          verified: true,
          passwordLess: true,
          socialLinks: {
            google: profile.id
          },
          profile: userData,
          role: ["participant"]
        });
        let saved = await user.save()
        return done(null, user)
      } catch (in_error) {
        console.log('in_error' + in_error)
        return done(in_error, false)
      }
    } catch (error) {
      console.log(error)
      return done(error, null)
    }
  }
}

module.exports = {
  isAuthenticated,
  hasRole,
  isParticipant,
  isVolunteer,
  isAdmin,
  linkSocialToAccount
}