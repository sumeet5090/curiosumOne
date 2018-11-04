const mongoose = require('mongoose')
const Schema = mongoose.Schema
const counter = require('./counter.model')
// async function createCounter() {
//     try {
//         let existingCounter = await counter.findOne({ _id: "tech_updates_Counter" })
//         if (!existingCounter) {
//             let counterDoc = new counter({
//                 _id: "tech_updates_Counter",
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

const techSchema = Schema({
    _id: Number,
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    accumulator: {
        type: String
    },
    scrutineering_elec: {
        type: String
    },
    scrutineering_mech: {
        type: String
    },
    driver_egress: {
        type: String
    },
    tilt: {
        type: String
    },
    noise_ready_to_drive_sound: {
        type: String
    },
    brakes: {
        type: String
    },
    rain: {
        type: String
    },
    event: {
        type: Number,
        ref: 'Event'
    }
})

techSchema.pre('save', async function (next) {
    let doc = this;
    try {
        let incCounter = await counter.findOneAndUpdate({ _id: 'tech_updates_Counter' }, { $inc: { seq: 1 } }, { new: true });
        if (incCounter) {
            doc._id = incCounter.seq
            return next()
        }
        return next({ "message": "Couldn't Update the counter." })
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model('TechUpdate', techSchema)