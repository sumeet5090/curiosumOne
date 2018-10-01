const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  NotificationSchema = Schema({
    date: {
      type: Schema.Types.Date,
      default: Date.now
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  }, {
    timestamps: true
  })
module.exports = mongoose.model('Notification', NotificationSchema)