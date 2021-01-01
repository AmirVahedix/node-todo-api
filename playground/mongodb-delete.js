const MongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017/TodoApp"
const dbname = "TodoApp"

MongoClient.connect(url,(error, client) => {

    if (error) { return console.log("Unable to connect mongodb") }

    console.log("Connected to Mongodb")

    const db = client.db(dbname)

    // db.collection('Todos').deleteMany({completed: false}).then((result) => {
    //     console.log("Todos Deleted Successfully");
    // }, (error) => {
    //     console.log("an error ouccurred while deleting todo");
    // })

    // db.collection('Todos').deleteOne({text: 'Do Something'}).then((result) => {
    //     console.log("Todo Deleted Successfully");
    // }, (error) => {
    //     console.log("an error ouccurred while deleting todo");
    // })

    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log("Todo Deleted Successfully");
    }, (error) => {
        console.log("an error ouccurred while deleting todo");
    })

    client.close()

})