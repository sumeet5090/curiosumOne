const mongoose = require('mongoose')
const Schema = mongoose.Schema
const counter = require('./counter.model')
// async function createCounter() {
//     try {
//         let existingCounter = await counter.findOne({ _id: "car_Counter" })
//         if (!existingCounter) {
//             let counterDoc = new counter({
//                 _id: "car_Counter",
//                 seq: 0
//             })
//             let saved = await counterDoc.save()
//             if (saved) {
//                 return console.log("Created counter")
//             }
//             return console.log("Failed to create a counter.")
//         } else {
//             return
//         }
//     } catch (error) {
//         console.log(error)
//         return
//     }
// }
// createCounter()

const CarSchema = Schema({
    _id: Number,
    team_id: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    event_id: {
        type: Number,
        ref: "Event"
    },
    car_number: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

CarSchema.pre('save', async function (next) {
    let doc = this
    try {
        let incCounter = await counter.findOneAndUpdate({ _id: 'car_Counter' }, { $inc: { seq: 1 } }, { new: true })
        if (incCounter) {
            doc._id = incCounter.seq
            return next()
        }
        return next({ "message": "Couldn't Update the counter." })
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model('Car', CarSchema)