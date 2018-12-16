const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let TeamSchema = Schema({
  category: {
    type: String,
    enum: ['combustion', 'electric'],
    required: true,
  },
  car: {
    type: Number,
    ref: 'Car'
  },
  team_name: {
    type: String,
  },
  institution: {
    name: {
      type: String
    },
    address: {
      type: String
    },
    short_name: {
      type: String
    }
  },
  location: {
    type: String
  },
  country: {
    type: String
  },
  website_url: {
    type: String,
    default: ""
  },
  social: {
    facebook: {
      type: String,
      default: ""
    },
    twitter: {
      type: String,
      default: ""
    },
    instagram: {
      type: String,
      default: ""
    }
  },
  logo: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  captain: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  events: [{
    type: Number,
    ref: 'Event'
  }],
  team_captain_email: {
    type: String
  },
  team_captain_full_name: {
    type: String
  },
  drive_folder: {
    type: String
  },
  alumnus: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  old_events: [{
    name: "",
    link: String,
  }]
}, {
    timestamps: true
  });
module.exports = mongoose.model('Team', TeamSchema)