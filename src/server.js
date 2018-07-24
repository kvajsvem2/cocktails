var express = require('express')
    path = require('path')
    bodyParser = require('body-parser')
    cors = require('cors')
    mongoose = require('mongoose')
    config = require('./DB.js')
    ingredientRoutes = require('./expressRoutes/ingredientRoutes')

mongoose.Promise = global.Promise

mongoose.connect(config.DB).then(
    () => {console.log('Database is conected!')},
    err => { console.log('Can not connect to the database ' + err)}
)

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())
app.use('/ingredients', ingredientRoutes)
const port = process.env.PORT || 8080

var server = app.listen(function(){
    console.log('listening on port ' + port)
})

mongoose.connect('mongodb://localhost/ingredients')

app.use(bodyParser.urlencoded({extended: true }))
app.use(bodyParser.json())


console.log('listening to port 8080')