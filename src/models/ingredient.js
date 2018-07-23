var mongoose = require('mongoose')
var Schema = mongoose.Schema

var IngredientSchema = new Schema({
    name: String,
    type: String,
    price: Number
})

var Ingredient = mongoose.model('ingredient', IngredientSchema)

module.exports = Ingredient