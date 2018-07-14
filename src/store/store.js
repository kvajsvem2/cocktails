import Vue from 'vue'
import Vuex from 'vuex'
import constants from './constants'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        ingredientQuantities : {
          'syrup': 0,

          'lime': 0,

          'pineapple': 0,

          'orange': 0,

          'cranberry': 0,

          'coconut': 0,

          'mint': 0,

          'lemon': 0,

          'tomato': 0,

          'coca cola': 0,

          'ginger beer': 0,

          'rum': 0,

          'vodka': 0,

          'peach schnapps': 0,

          'triple sec': 0,

          'whiskey': 0,

          'tequila': 0,

          'grenadine': 0,

          'orange liqueur': 0,

          'coffee liqueur': 0,

          'gin': 0,

          'prosecco': 0,

          'peach purée': 0,

          'cachaça': 0,

          'soda water': 0,

          'champagne': 0,

          'white wine': 0,

          'crème de cassis': 0,

        },

        cocktailQuantities: {

          'Kir': 0,

          'French 75': 0,

          'Caipirinha': 0,

          'Bellini': 0,

          'Long Island Iced Tea': 0,

          'Mojito': 0,

          'Pina Colada': 0,

          'Sex on the Beach': 0,

          'Cuba Libre': 0,

          'Cosmopolitan': 0,

          'Tequila Sunrise': 0,

          'Margarita': 0,

          'Black Russian': 0,

          'Bloody Mary': 0,

          'Mint julep': 0,

          'Moscow Mule': 0,
        },

        option: '',

        optionCocktails: 'type',

        selection: 'fruit',
    },
    getters: {
      types: function(){
        let array = []
        constants.ingredients.forEach(ingredient => {
          if(!array.includes(ingredient.type)){
            array.push(ingredient.type)
          }
        })
        return array
      },
      chosenType: function(state){
        return constants.ingredients.filter(ingredient => ingredient.type == state.selection)
      },
      chosenIngredients: function(state){
        return constants.ingredients.filter(ingredient => state.ingredientQuantities[ingredient.name] != 0)
      },
      chosenIngredientsCost: function(state, getters){
        return getters.chosenIngredients.reduce((acc, current) => acc + (current.price * state.ingredientQuantities[current.name]), 0)
      },
      possible: function(state){
        return constants.cocktails.filter(cocktail => cocktail.ingredients.every(ingredient => {
          return ingredient.quantity <= state.ingredientQuantities[ingredient.name]
        }))
      },
      atLeastOne: function(state, getters){
        return constants.cocktails.filter(cocktail => cocktail.ingredients.some(ingredient => state.ingredientQuantities[ingredient.name] != 0) && !getters.possible.includes(cocktail))
      },
      missingIngredients: function(state, getters){
        let array = []
        getters.atLeastOne.forEach(cocktail => {
          array.push({
            cocktail: cocktail,
            missing: cocktail.ingredients.map(ingredient => constants.ingredients.find(obj => obj.name == ingredient.name)).filter(ingredient => getters.missingQuantities(ingredient.name, cocktail) > 0),
            price: cocktail.ingredients.reduce((acc, current) => { return acc + (getters.missingQuantities(current.name, cocktail) * constants.ingredients.find(obj => obj.name == current.name).price)}, 0)
          })
        })
        if (state.option == 'number'){
          return array.sort((a, b) => {
            if (a.missing.length < b.missing.length) {return -1}
            else if (b.missing.length < a.missing.length) {return 1}
            else {
              if (a.price < b.price) {return -1}
              else if (b.price < a.price) {return 1}
              else {
                if (a.cocktail.name < b.cocktail.name) {return -1}
                else {return 1}
              }
            } 
          })
        }
        else if (state.option == "cost"){
          return array.sort((a, b) => {
            if (a.price < b.price) {return -1}
            else if (b.price < a.price) {return 1}
            else {
              if (a.missing.length < b.missing.length) {return -1}
              else if (b.missing.length < a.missing.length) {return 1}
              else {
                if(a.cocktail.name < b.cocktail.name) {return -1}
                else {return 1}
              }
            }
          })
        }
        else {
          return array.sort((a, b) => {
            if (a.cocktail.name < b.cocktail.name){return -1}
            else {return 1}
          })
        }
      },
      missingQuantities: function(state){
        return function(ingredientName, cocktail){
          let number = cocktail.ingredients.find(obj => obj.name == ingredientName).quantity - state.ingredientQuantities[ingredientName]
          if (number > 0){
            return number
          }
          else {
            return 0
          }
        }
      },
      cocktailCost: function(state){
        return function(cocktail){
          let cost = cocktail.ingredients.reduce((acc, current) => acc + (current.quantity * constants.ingredients.find(obj => obj.name == current.name).price), 0)
          return cost
        }
      },
      cocktails: function(state, getters){
        return constants.cocktails.map(cocktail => {
          return {
            ...cocktail,
            cost: getters.cocktailCost(cocktail)
          }
        })
      },
      chosenCocktails: function(state){
        return constants.cocktails.filter(cocktail => state.cocktailQuantities[cocktail.name] != 0)
      },
      chosenCocktailsAnalysis: function(state){
        return constants.cocktails.filter(cocktail => state.cocktailQuantities[cocktail.name] == -1).map(cocktail => {
          let bitterSweet = cocktail.ingredients.reduce((acc, current) => 
            acc + (constants.ingredients.find(obj => obj.name == current.name).bitterSweet * current.quantity)
          , 0)
          return {
            ...cocktail,
            bitterSweet: bitterSweet
          }
        })
      },
      totalCost: function(state, getters){
        return getters.chosenCocktails.reduce((acc, current) => acc + (getters.cocktailCost(current) * state.cocktailQuantities[current.name]), 0)
      },
      combinedIngredients: function(state, getters){
        let array = []
        constants.ingredients.forEach(ingredient => {
          let quantity = 0
          getters.chosenCocktails.forEach(cocktail => {
            if (cocktail.ingredients.find(obj => obj.name == ingredient.name)){
              quantity += (cocktail.ingredients.find(obj => obj.name == ingredient.name).quantity * state.cocktailQuantities[cocktail.name])
            }
          })
          array.push ({
            ...ingredient,
            quantity: quantity
          })
        })
        if (state.optionCocktails == 'type'){
          return array.sort((a, b) => {
            if (a.type < b.type){return -1}
            else if (b.type < a.type){return 1}
            else {
              if (a.quantity < b.quantity){return -1}
              else if (b.quantity < a.quantity){return 1}
              else {
                if(a.name < b.name){return -1}
                else {return 1}
              }
            }
          })
        }
        else if (state.optionCocktails == 'number'){
          return array.sort((a, b) => {
            if (a.quantity < b.quantity){return -1}
            else if (b.quantity < a.quantity){return 1}
            else {
              if (a.type < b.type){return -1}
              else if (b.type < a.type){return 1}
              else {
                if (a.name < b.name){return -1}
                else {return 1}
              }
            }
          })
        }
        else if (state.optionCocktails == 'name'){
          return array.sort((a, b) => {
            if (a.name < b.name){return -1}
            else {return 1}
          })
        }
      }
    },
    mutations: {
        removeCocktail(state, name){
          state.cocktailQuantities[name] -= 1
        },
        addCocktail(state, name){
          state.cocktailQuantities[name] += 1
        },
        removeCocktailAnalysis(state, name){
          state.cocktailQuantities[name] = 0
        },
        addCocktailAnalysis(state, name){
          state.cocktailQuantities[name] = -1
        },
        addIngredient(state, name){
          state.ingredientQuantities[name] += 1
        },
        removeIngredient(state, name){
          state.ingredientQuantities[name] -= 1
        },
        select(state, type){
            state.selection = type
        },
        order(state, option){
          state.option = option
        },
        orderCocktails(state, optionCocktails){
          state.optionCocktails = optionCocktails
        }
    },
    actions: {
        removeCocktail(context, name){
          context.commit('removeCocktail', name)
        },
        addCocktail(context, name){
          context.commit('addCocktail', name)
        },
        removeCocktailAnalysis(context, name){
          context.commit('removeCocktailAnalysis', name)
        },
        addCocktailAnalysis(context, name){
          context.commit('addCocktailAnalysis', name)
        },
        addIngredient(context, name){
            context.commit('addIngredient', name)
        },
        removeIngredient(context, name){
            context.commit('removeIngredient', name)
        },
        select(context, type){
            context.commit('select', type)
        },
        order(context, option){
          context.commit('order', option)
        },
        orderCocktails(context, optionCocktails){
          context.commit('orderCocktails', optionCocktails)
        }
    }
})