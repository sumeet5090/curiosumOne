const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CounterSchema = Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
})

let counter = mongoose.model("Counter", CounterSchema)

async function createCounter() {
    try {
        let existingCounter = await counter.findOne({ _id: "entityId" })
        if (!existingCounter) {
            let counterDoc = new counter({
                _id: "entityId",
                seq: 0
            })
            let saved = await counterDoc.save()
            if (saved) {
                return console.log("Created counter")
            }
            return console.log("Failed to create a counter.")
        } else {
            return;
        }
    } catch (error) {
        console.log(error)
        return;
    }
}
createCounter()

const EventSchema = Schema({
    _id: Number,
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    venue: {
        type: String
    },
    organizer: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    link: {
        type: String
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }]
}, { timestamps: true })

EventSchema.pre('save', async function (next) {
    let doc = this;
    try {
        let incCounter = await counter.findOneAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, { new: true });
        if (incCounter) {
            doc._id = incCounter.seq
            return next()
        }
        return next({ "message": "Couldn't Update the counter." })
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model('Event', EventSchema)