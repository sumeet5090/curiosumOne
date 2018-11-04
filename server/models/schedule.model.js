const mongoose = require('mongoose')
const Schema = mongoose.Schema
const counter = require('./counter.model')
// async function createCounter() {
//     try {
//         let existingCounter = await counter.findOne({ _id: "schedule_Counter" })
//         if (!existingCounter) {
//             let counterDoc = new counter({
//                 _id: "schedule_Counter",
//                 seq: 0
//             })
//             let saved = await counterDoc.save()
//             if (saved) {
//                 return console.log("Created counter")
//             }
//             return console.log("Failed to create a counter.")
//         } else {
//             return;
//         }
//     } catch (error) {
//         console.log(error)
//         return;
//     }
// }
// createCounter()
const ScheduleSchema = Schema({
    _id: Number,
    event_id: {
        type: Number,
        ref: 'Event'
    },
    day_number: {
        type: Number,
    },
    day: {
        type: String
    },
    date: {
        type: Date
    },
    activity: {
        type: String
    },
    start_time: {
        type: Date,
    },
    end_time: {
        type: Date
    },
    location: {
        type: String
    },
    comments: {
        type: String
    },
    volunteer_view: {
        type: Boolean,
        default: false
    },
    participant_view: {
        type: Boolean,
        default: false
    },
    visitor_view: {
        type: Boolean,
        default: true
    },
})


ScheduleSchema.pre('save', async function (next) {
    let doc = this;
    try {
        let incCounter = await counter.findOneAndUpdate({ _id: 'schedule_Counter' }, { $inc: { seq: 1 } }, { new: true });
        if (incCounter) {
            doc._id = incCounter.seq
            return next()
        }
        return next({ "message": "Couldn't Update the counter." })
    } catch (error) {
        next(error)
    }
})
module.exports = mongoose.model('Schedule', ScheduleSchema)