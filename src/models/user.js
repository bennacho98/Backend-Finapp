const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: String,
    lastname : String,
    role: {
        type: Number,
        default: 4
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', User)