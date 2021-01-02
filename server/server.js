const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const URL = "mongodb://localhost:27017/TodoApp"

mongoose.connect(URL)

// let Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minLength: 5,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completed_at: {
//         type: Number,
//         default: null
//     }
// })

// let newTodo = new Todo({
//     text: 'go jumping',
// })

// newTodo.save().then((result) => {
//     console.log(JSON.stringify(result, undefined, 2));
// }, (error) => {
//     console.log("Unable to save todo", error);
// })

let User = new mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 5
    }
})

let newUser = new User({
    email: 'amirvahedix@gmail.com'
})

newUser.save().then((result) => {
    console.log("user created successfully");
}, (error) => {
    console.log("error while saving user");
})