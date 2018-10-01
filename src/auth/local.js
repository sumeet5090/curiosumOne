const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt'
import User from './../models/user.model'
import CONFIG from './../config/config'
module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })

  passport.deserializeUser(function (user_id, done) {
    User.findOne({
      _id: user_id
    }, function (err, user) {
      if (err) {
        done(err, false)
      }
      done(null, user)
    })
  })

  passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.jwt_secret
  }, async (payload, done) => {
    try {
      let user = await User.findOne({
        _id: payload.user_id
      })
      if (!user) {
        return done(null, false)
      } else {
        return done(null, user.toWeb())
      }
    } catch (e) {
      console.log('Some error: ', e);
      return done(e, false)
    }
  }))
  passport.use('jwt.admin', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.jwt_secret
  }, async (payload, done) => {
    try {
      let user = await User.findOne({
        _id: payload.user_id
      })
      if (user.role == 'admin' || user.role == 'staff') {
        return done(null, user.toWeb())
      } else {
        return done(null, false)
      }
    } catch (e) {
      console.log('Some error: ', e);
      return done(e, false)
    }
  }))
  passport.use('jwt.change', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.jwt_secret,
    passReqToCallback: true
  }, async (req, payload, done) => {
    try {
      let user = await User.findOne({
        _id: payload.user_id
      })
      if (req.params.id == user._id || user.role == 'admin' || user.role == 'staff') {
        return done(null, user.toWeb())
      } else {
        return done(null, false)
      }
    } catch (e) {
      console.log('Some error: ', e);
      return done(e, false)
    }
  }))
  passport.use('jwt.notloggedin', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.jwt_secret
  }, async (payload, done) => {
    console.log(payload);
    try {
      let user = await User.findOne({
        _id: payload.user_id
      })
      if (!user) {
        return done(null, true)
      } else {
        return done(null, user.toWeb())
      }
    } catch (e) {
      console.log('Some error: ', e);
      return done(e, false)
    }
  }))
}



// passport.use('local.register', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// }, async function (req, email, password, done) {
//   req.checkBody('email', 'Invalid Email').notEmpty().isEmail()
//   req.checkBody('password', 'Invalid password').notEmpty().isLength({
//     min: 6,
//     max: 32
//   })

//   let errors = req.validationErrors()
//   if (errors) {
//     let messages = []
//     errors.forEach(function (err) {
//       messages.push(error.msg)
//     })
//     return done(null, false, {
//       message: messages
//     })
//   }
//   try {
//     let user = await User.findOne({
//       email: email
//     })
//     if (user) {
//       return done(null, false, {
//         message: "Email already in use."
//       })
//     }
//     let newUser = new User({
//       email: email,
//       password: password,
//       first_name: req.body.first_name,
//       last_name: req.body.last_name
//     })
//     let result = await newUser.save()
//     return done(null, result)

//   } catch (error) {
//     return done(error, false)
//   }
//   // User.findOne({
//   //   email: email
//   // }, function (err, user) {
//   //   if (err) {
//   //     return done(err, false)
//   //   }
//   //   if (user) {
//   //     return done(null, false, {
//   //       message: "Email already in use."
//   //     })
//   //   }
//   //   let newUser = new User({
//   //     email: email,
//   //     password: password,
//   //     first_name: req.body.first_name,
//   //     last_name: req.body.last_name,
//   //   }).save((err) => {
//   //     if (err) {
//   //       console.log(err)
//   //       return done(err, false)
//   //     }
//   //   })
//   //   return done(null, newUser)
//   // })
// }))

// passport.use('local.login', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// }, async function (req, email, password, done) {
//   req.checkBody('email', 'Invalid Email').notEmpty().isEmail()
//   req.checkBody('password', 'Invalid Password').notEmpty()
//   let errors = req.validationErrors()
//   if (errors) {
//     let messages = []
//     errors.forEach(function (error) {
//       messages.push(error.msg)
//     })
//     return done(null, false, {
//       message: messages
//     })
//   }
//   try {
//     let user = await User.findOne({
//       email: email
//     })
//     if (user) {
//       let match = user.comparePassword(password)
//       if (match) {
//         return done(null, user)
//       }
//       return done(null, false, {
//         message: "Incorrect combination"
//       })
//     }
//     return done(null, false)
//   } catch (error) {
//     return done(error, false)
//   }
// }))
// module.exports = passport;


// const localOpts = {
//     usernameField: email,
//     passwordField: password,
//     session: false,
//     passReqToCallback: true
// }

// const localStrategy = new LocalStrategy(localOpts, async (req, email, password, done) => {
//     try {
//         const user = await User.findOne({
//             email
//         });
//         if (!user) {
//             return done(null, false)
//         } else if (user.comparePassword(password)) {
//             return done(null, true)
//         }
//         return done(null, false)
//     } catch (e) {
//         return done(e, false)
//     }
// })