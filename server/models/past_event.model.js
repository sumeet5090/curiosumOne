const mongoose = require('mongoose')
const Schema = mongoose.Schema
const counter = require('./counter.model')
async function createCounter() {
    try {
        let existingCounter = await counter.findOne({ _id: "past_event_Counter" })
        if (!existingCounter) {
            let counterDoc = new counter({
                _id: "car_Counter",
                seq: 0
            })
            let saved = await counterDoc.save()
            if (saved) {
                return console.log("Created counter")
            }
            return console.log("Failed to create a counter.")
        } else {
            return
        }
    } catch (error) {
        console.log(error)
        return
    }
}
createCounter()

const pastEventSchema = Schema({
    _id: Number,
    team_id: {
        type: Schema.Types.ObjectID,
        ref: 'Team'
    },
    car_number: {
        type: String
    },
    design: {
        type: String
    },
    cost: {
        type: Number
    },
    business: {
        type: String
    },
    skidpad: {
        type: String
    },
    acceleration: {
        type: String
    },
    autocross: {
        type: String
    },
    endurance: {
        type: String
    },
    efficiency: {
        type: String
    }
}, { timestamps: true })

pastEventSchema.pre('save', async function (next) {
    let doc = this
    try {
        let incCounter = await counter.findOneAndUpdate({ _id: 'past_event_Counter' }, { $inc: { seq: 1 } }, { new: true })
        if (incCounter) {
            doc._id = incCounter.seq
            return next()
        }
        return next({ "message": "Couldn't update the counter." })
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model('PastEvent', pastEventSchema)