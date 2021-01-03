const mongoose = require('mongoose')
const validator = require('validator')

let User = new mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        validate: {
            validator: validator.isEmail,
            message: "{value} is an invalid email"
            
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    token: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

module.exports = {User}