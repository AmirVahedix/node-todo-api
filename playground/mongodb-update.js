const {MongoClient, ObjectID} = require('mongodb')

const url = "mongodb://localhost:27017/TodoApp"
const dbname = "TodoApp"

MongoClient.connect(url,(error, client) => {

    if (error) { return console.log("Unable to connect mongodb") }

    console.log("Connected to Mongodb")

    const db = client.db(dbname)

    // //Set
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5fef2444cb24a09dd4169d0f")
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log("updated successfully")
    // }, (error) => {
    //     console.log("an error occurred while updateing");
    // })

    //Increment
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5feee0cbd243b91c3c106da2")
    }, {
        $inc: {
            age: 2
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log("updated successfully")
    }, (error) => {
        console.log("an error occurred while updateing");
    })

    client.close()

})