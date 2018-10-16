const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let TeamSchema = Schema(
  {
    category: {
      type: String,
      enum: ['combustion', 'electric'],
      required: true,
    },
    car_number: {
      type: String,

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
    },
    social: {
      facebook: {
        type: String,
      },
      twitter: {
        type: String
      },
      instagram: {
        type: String,
      }
    },
    logo: {
      type: String
    },
    bio: {
      type: String
    },
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    captain: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

TeamSchema.methods.toWeb = function () {
  let { institution_name_short, _json } = this
  return _json
}

// TeamSchema.pre('save', function(next) {
//   // console.log('Team data\n', this)
//   next()
// })


module.exports = mongoose.model('Team', TeamSchema)