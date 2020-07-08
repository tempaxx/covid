const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const userSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

const User = mongoose.model('users', userSchema)

module.exports = User