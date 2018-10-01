const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  AnnouncementSchema = Schema({
    title: {
      type: String,
      required: true
    },
    date: {
      type: Schema.Types.Date,
      default: Date.now()
    },
    description: {
      type: String,
      default: ''
    },
    by: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }, {
    timestamps: true
  })
module.exports = mongoose.model('Announcement', AnnouncementSchema)