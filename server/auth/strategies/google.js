let Strategy = require('passport-google-oauth').OAuth2Strategy;
let helper = require('./../helper');
let keys = require('./../../../config/keys')
// Scopes
// 'https://www.googleapis.com/auth/admin.directory.user', 'https://www.googleapis.com/auth/admin.directory.group', 'https://www.googleapis.com/auth/admin.directory.group.readonly', 'https://www.googleapis.com/auth/admin.directory.group.member', 'https://www.googleapis.com/auth/admin.directory.group.member.readonly'
module.exports = (passport) => {
  let googleOAuth = new Strategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect',
    prompt: true,
    passReqToCallback: true,
    scope: ['email', 'profile', ]
  }, (req, accessToken, refreshToken, profile, done) => {
    helper.linkSocialToAccount({
      req,
      accessToken,
      refreshToken,
      profile,
      done,
      provider: "google",
      email: profile.emails[0].value,
      userData: {
        first_name: profile._json.name.givenName,
        last_name: profile._json.name.familyName,
        gender: profile.gender,
        picture: profile.photos && profile.photos.length > 0 ? profile.photos[0].value.replace("sz=50", "sz=200") : null,
        location: profile.location || null
      }
    })
  })
  passport.use("google", googleOAuth)
}