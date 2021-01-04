const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const SECRET_KEY = "amirsecret"

let UserSchema = new mongoose.Schema({
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
    tokens: [{
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

UserSchema.methods.toJSON = function(){
    let user = this 
    let userObj = user.toObject()

    return _.pick(userObj, ["_id", "email"])
}

UserSchema.methods.generateAuthToken = function() {
    let user = this
    let access = 'auth'
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'SECRET_KEY').toString()

    user.tokens.push({access, token})

    return user.save().then(() => {
        return token 
    })
}

let User = new mongoose.model('User', UserSchema)

module.exports = {User}