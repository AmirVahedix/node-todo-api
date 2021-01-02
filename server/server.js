const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const URL = "mongodb://localhost:27017/TodoApp"

mongoose.connect(URL)

let Todo = mongoose.model('Todos', {
    text: {
        type: String,
    },
    completed: {
        type: Boolean
    },
    completed_at: {
        type: Number
    }
})

let newTodo = new Todo({
    text: 'Cook cookies',
    completed: false,
    completed_at: new Date()
})

newTodo.save().then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
}, (error) => {
    console.log("Unable to save todo", error);
})
