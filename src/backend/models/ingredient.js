const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a ingredient Schema and model
const IngredientSchema = new Schema({
    name: String,
    type: String,
    price: Number
})

const Ingredient = mongoose.model('ingredient', IngredientSchema)

module.exports = Ingredient