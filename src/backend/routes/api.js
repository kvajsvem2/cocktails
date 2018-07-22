const express = require('express')

const Ingredient = require('../models/ingredient')

const router = express.Router()

//get a list of ingredient from the database
router.get('/ingredients', function(req, res){
    res.send({type: 'GET'})
})

//add a new ingredient
router.post('/ingredients', function(req, res){
    Ingredient.create(req.body).then(function(result){
        res.send('The ingredient ' + result.name + ' was saved to the database!')
    })
})

//update a ingredient from the database
router.put('/ingredients/:id', function(req, res){
    res.send({id: req.params.id})
})

//delete a ingredient from the database
router.delete('/ingredients/:id', function(req, res){
    res.send({id: req.params.id})
})

module.exports = router