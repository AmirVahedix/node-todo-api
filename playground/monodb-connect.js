const MongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017/TodoApp"
const dbname = "TodoApp"

MongoClient.connect(url, (error, client) => {
    if (error) { return console.log("Unable To Connect Database."); }
    
    console.log("Connected To Monogdb.");

    const db = client.db(dbname)

    // db.collection('Todos').insertOne({

    //     text: 'Something to do 2',
    //     completed: false

    // }, (error, result) => {

    //     if (error) { return console.log(error); }

    //     console.log(JSON.stringify(result.ops, undefined, 2));

    // })

    db.collection('Users').insertOne({

        name: 'amir vahedi',
        age: 18,
        location: 'Tehran'

    }, (error, result) => {

        if (error) { return console.log(error); }

        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));

    })

    client.close()
})