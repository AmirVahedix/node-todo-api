const {User} = require('../models/User')

let authenticate = (req, res, next) => {
    let token = req.headers['x-auth']

    User.findByToken(token).then((user) => {
        if(!user){ 
            return Promise.reject()
        }
         
        req.user = user
        req.token = token
        next()
    })
    .catch((error) => {
        res.status(401).send(error)
    })
}

module.exports = {authenticate}