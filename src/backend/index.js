const express = require('express')
const routes = require('./routes/api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//set up express app
const app = express()

//connect to the database
mongoose.connect('mongodb://localhost/ingredients')
mongoose.Promise = global.Promise

//initialize body-parser
app.use(bodyParser.json())

//initialize routes
app.use(routes)

//listen for requests
app.listen(process.env.port || 8080, function(){
    console.log('now listening for requests!')
})