const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  NotificationSchema = Schema({
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
    // // Option? 
    // image: {
    //     type: String
    // }
  }, {
    timestamps: true
  })
module.exports = mongoose.model('Notification', NotificationSchema)