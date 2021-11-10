const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Outcome = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    value: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('outcomes', Outcome)