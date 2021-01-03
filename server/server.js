const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/Todo')
const {User} = require('./models/User')
const express = require('express')
const bodyParser = require('body-parser')

let app = express()

app.use(bodyParser.json())


app.post('/todos', (request, response) => {
    
    let todo = new Todo({
        text: request.body.text
    })

    todo.save().then((doc) => {
        response.status(500).send(doc)
    }, (e) => {
        response.status(400).send(e)
    })

})


app.listen(3000, () => {
    console.log("listening on port 3000...");
})