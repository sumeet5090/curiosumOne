let passport = require('passport')
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

let User = require('./../models/user.model')

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: '/auth/google/redirect',
  }, async function (accessToken, refreshToken, profile, done) {
    let userinfo = {
      email: profile.emails[0].value,
      first_name: profile._json.name.givenName,
      last_name: profile._json.name.familyName,
      raw_profile_image: (profile._json.image.url).split('?')[0],
      google_plus_url: profile._json.url,
      google_id: profile.id
    }
    try {
      let existingUser = await User.findOne({
        google_id: userinfo.google_id
      })
      if (existingUser) {
        return done(null, existingUser)
      } else {
        let user = await new User({
          first_name: userinfo.first_name,
          last_name: userinfo.last_name || '',
          email: userinfo.email,
          raw_profile_image: userinfo.raw_profile_image,
          google_id: userinfo.google_id,
          google_plus_url: userinfo.google_plus_url,
          confirmed: true
        }).save()
        if (user) {
          done(null, user)
        } else {
          done(new Error("Couldn't create user."), null)
        }
      }
    } catch (error) {
      console.log(error)
      done(error, null)
    }
  }))
  passport.serializeUser((user_id, done) => {
    done(null, user_id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if(user){
        done(null, user)
      }
    })
  })
}