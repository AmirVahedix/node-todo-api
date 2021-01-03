const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const URL = "mongodb://localhost:27017/TodoApp"

mongoose.connect(URL)

module.exports = {mongoose}