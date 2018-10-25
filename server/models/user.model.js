const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const validate = require('mongoose-validator')
const CONFIG = require('./../../config/keys')
let Schema = mongoose.Schema;
let UserSchema = Schema({
  events: [{
    type: Number,
    ref: 'Event'
  }],
  username: {
    type: String,
    unique: true,
    index: true,
    sparse: true,
    lowercase: true
  },
  phone_number: {
    type: String,
    lowercase: true,
    trim: true,
  },
  first_name: {
    type: String,
    trim: true
  },
  last_name: {
    type: String,
    trim: true
  },
  role: [{
    type: String,
    enum: ['admin', 'staff', 'volunteer', 'participant', 'alumni'],
  }],
  // title: {
  //   default: function () {
  //     if (role == 'volunteer') {
  //       titles = ['design-judge', 'cost-judge', 'business-judge', 'inspector-mech', 'inspector-elec', 'ground-vol', 'track']
  //       // TODO
  //     }
  //   }
  // },
  google_id: String,
  profile: {
    picture: String,
    location: String,
    display_name: String,
    gender: String
  },
  provider: String,
  passwordLess: Boolean,
  verified: Boolean,
  display_name: {
    type: String,
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
  socialLinks: {
    google: String,
    facebook: String
  },
  status: {
    type: Number,
    default: 1,
    // Anything other than 1 is deactivated/deleted
  }
  // TODO: Social Media links
}, {
    timestamps: true
  })

function strip(str) {
  return str.replace(/^\s+|\s+$/g, '');
}
async function isUnique(username){ 
  try {
    let notUnique = await mongoose.models['User'].findOne({username: username})
    if(notUnique){
      return false
    } else {
      return true
    }
  } catch(error){
    console.log(error)
    setTimeout(isUnique(username), 500)
  }
}
function generateRandomUsername(firstname, lastname){
  return firstname + '-' + lastname + '-' + (Math.round(Math.random() * 9999)).toString()
}
UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('first_name') || user.isModified('last_name')) {
    user.first_name = strip(user.first_name)
    user.last_name = strip(user.last_name)
    if (!user.last_name){
      user.display_name = user.first_name
    } else {
      user.display_name = user.first_name + ' ' + user.last_name
    }
    try {
      let username
      while (true) {
        username = generateRandomUsername(user.first_name, user.last_name)
        if(isUnique(username)){
          user.username = username
          break
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return next()
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
  }, CONFIG.jwt.secret, {
      expiresIn: CONFIG.jwt.expiration
    })
}
UserSchema.methods.toWeb = function () {
  let json = this.toJSON()
  json.password = 'HIDDEN'
  json.id = this._id
  return json
}

module.exports = mongoose.model('User', UserSchema)