const express = require('express')
const { MongoClient } = require('mongodb');
const bodyparser= require('body-parser')
const dotenv = require('dotenv');
const cors = require('cors')




// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passOp';
const app = express()
const port = 3000
dotenv.config()
app.use(bodyparser.json())
app.use(cors())

client.connect();


// get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.find({ }).toArray();
    res.json(findResult)
})

// save the password
app.post('/', async (req, res) => {
    const db = client.db(dbName);
    const password = req.body;
    const collection = db.collection('password');
    const findResult = await collection.insertOne(password);
    res.send({success:true, result: findResult})
})

// delete password by id
app.delete('/', async (req, res) => {
    const db = client.db(dbName);
    const password = req.body;
    const collection = db.collection('password');
    const findResult = await collection.deleteOne(password);
    res.send({success:true, result: findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
