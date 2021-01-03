const {mongoose} = require('./db/mongoose')
const {ObjectID} = require('mongodb')
const {Todo} = require('./models/Todo')
const {User} = require('./models/User')
const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')

mongoose.set('useFindAndModify', false);

let app = express()

app.use(bodyParser.json())

// Create Todo
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

// Read all Todos
app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send(todos)
    }, (e) => {
        response.status(400).send(todos)
    })
})

// Read one Todo
app.get('/todos/:id', (request, response) => {
    let id = request.params.id
    if (!ObjectID.isValid(id)) {
        return response.status(404).send()
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return response.status(404).send()
        }
        response.send(todo)
    }).catch((e) => {
        return response.status(400).send()
    })
})

// Delete Todo
app.delete('/todos/:id', (request, response) => {
    let id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send("Todo not found.")
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return response.status(404).send("Todo not found.")
        }
        response.send("Todo deleted successfully")
    }).catch((e) => {
        return response.status(400).send("server error")
    })
})

// Update Todo
app.patch('/todos/:id', (request, response) => {
    let id = request.params.id
    let body = _.pick(request.body, ['text', 'completed'])

    if (!ObjectID.isValid(id)) {
        return response.status(404).send("Todo not found.")
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completed_at = new Date().getTime()
    }else{
        body.completed = false
        body.completed_at = null
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return response.status(404).send("Todo not found")
        }
        response.send(todo)
    }).catch((e) => {
        response.status(400).send("Server Error")
    })
})

// Create User
app.post('/users', (request, response) => {
    let body = _.pick(request.body, ['email', 'password'])
    let user = new User(body)

    user.save().then((user) => {
        return response.send(user)
    }).catch((e) => {
        return response.status(400).send(e)
    })
})

app.listen(3000, () => {
    console.log("listening on port 3000...");
})