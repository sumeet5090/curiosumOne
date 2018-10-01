import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';
import validate from 'mongoose-validator';
const CONFIG = require('./../config/config')
let Schema = mongoose.Schema;
let UserSchema = Schema({
  events: [{
    type: Number,
    ref: 'Event'
  }],
  confirmed: {
    type: Boolean,
    default: false
  },
  phone_number: {
    type: String,
    lowercase: true,
    trim: true,
    index: true
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'staff', 'volunteer', 'participant', 'alumni'],
    default: 'participant'
  },
  // title: {
  //   default: function () {
  //     if (role == 'volunteer') {
  //       titles = ['design-judge', 'cost-judge', 'business-judge', 'inspector-mech', 'inspector-elec', 'ground-vol', 'track']
  //       // TODO
  //     }
  //   }
  // },
  google_id: String,
  raw_profile_image: {
    type: String,
    default: ''
  },
  display_name: {
    type: String,
    default: function () {
      return this.first_name + ' ' + this.last_name
    }
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
    validate: [validate({
      validator: 'isEmail',
      message: 'Invalid Email'
    })]
  },
  google_plus_url: String,
  bio: String,
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  password: {
    type: String
  },
  // TODO: Social Media links
}, {
  timestamps: true
})
UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(CONFIG.salt_bcrypt, function (err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})
UserSchema.methods.comparePassword = function (password) {
  let user = this
  try {
    return bcrypt.compareSync(password, user.password)
  } catch (error) {
    return false;
  }
}
UserSchema.methods.getJWT = function () {
  return "Bearer " + jwt.sign({
    user_id: this._id,
  }, CONFIG.jwt_secret, {
    expiresIn: CONFIG.jwt_expiration
  })
}
UserSchema.methods.toWeb = function () {
  let json = this.toJSON()
  json.password = 'HIDDEN'
  json.id = this._id
  return json
}

module.exports = mongoose.model('User', UserSchema)