const MongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017/TodoApp"
const dbname = "TodoApp"

MongoClient.connect(url,(error, client) => {

    if (error) { return console.log("Unable to connect mongodb"); }

    console.log("Connected to Mongodb");

    const db = client.db(dbname)

    db.collection("Todos").find({completed: false}).toArray().then((docs) => {
        console.log("Todos: ")
        console.log(JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log("Unable to fetch todos");
    })

    db.collection("Users").find().count().then((count) => {
        console.log(`count: ${count}`)
    }, (error) => {
        console.log("Unable to fetch todos");
    })

    client.close()

})