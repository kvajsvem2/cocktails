var express = require('express')
var app = express()
var ingredientRoutes = express.Router()

//Require Ingredient model in our routes module
var Ingredient = require('../models/ingredient')

//defined store route
ingredientRoutes.route('/addingredient').post(function(req, res){
    Ingredient.create(req.body)
}).then(function(ingredient){
    res.status(200).json({'ingredient': 'Ingredient added succesfully!'})
}).catch(function(err){
    res.status(400).send('unable to save to database!')
})

//Defined get data(index or listing) route
ingredientRoutes.route('/'.get(function(req, res){
    Ingredient.find(function(err, ingredients){
        if (err){
            console.log(err)
        }
        else {
            res.json(ingredients)
        }
    })
}))

//Defined edit route
ingredientRoutes.route('/edit/:id').get(function(req, res){
    var id = req.params.id
    Ingredient.findById(id, function(err, ingredient){
        res.json(ingredient)
    })
})

//Defined delete / remove / destroy route
ingredientRoutes.route('/delete/:id').get(function(req, res){
    Ingredient.findByIdAndRemove({_id: req.params.id}, function(err, item){
        if(err) res.json(err)
        else res.json('Successfully removed!')
    })
})

module.exports = ingredientRoutes