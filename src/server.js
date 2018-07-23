var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/ingredients')

var app = express()

app.use(bodyParser.urlencoded({extended: true }))
app.use(bodyParser.json())

app.listen(8080)

console.log('listening to port 8080')