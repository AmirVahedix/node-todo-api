const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

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

UserSchema.methods.removeToken = function(token){
    let user = this

    return user.updateOne({
        $pull: {
            tokens: {token}
        }
    })
}

UserSchema.statics.findByToken = function(token){
    let User = this
    let decoded

    try {
        decoded = jwt.verify(token, 'SECRET_KEY')
    } catch (error) {
        return Promise.reject(error)
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

UserSchema.statics.findByCredentials = function(email, password){
    let User = this

    return User.findOne({email}).then((user) => {
        if(!user) { return Promise.reject() }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) { resolve(user) } else { reject() }
            })    
        })
    })
}

UserSchema.pre('save', function(next){
    let user = this
    if (user.isModified('password')){
        bcrypt.genSalt(16, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    }else{
        next()
    } 
})

let User = new mongoose.model('User', UserSchema)

module.exports = {User}