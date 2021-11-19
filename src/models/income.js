const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Income = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    value: {
        type: Number,
        min: 5000,
        max: 1500000
    },
    description: String,
    createAt: {
        type: Date,
        default: Date.now
    }
})

Income.pre('save', function(next){
    if (this.value <= 50000) {
        this.value -= 1000
    }
    next()
})

module.exports = mongoose.model('incomes', Income)