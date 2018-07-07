import Vue from 'vue'
import Vuex from 'vuex'
import constants from './constants'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {

        ingredients: constants.ingredients.map(ingredient => {
          return {
            ...ingredient,
            quantity: 0
          }
        }),

        cocktails: constants.cocktails.map(cocktail => {
          return {
            ...cocktail,
            quantity: 0,
          }
        }),

        option: '',

        optionCocktails: 'type',

        selection: 'fruit',

        chosenIngredients: [],

        chosenCocktails: [],
    },
    getters: {
      ingredientNameToQuantity(getters){
        return function(name){
          return (getters.nameToIngredient(name)).quantity
        }
      },
      totalCost(state, getters){
        return state.chosenCocktails.reduce((acc, current) => acc + getters.missingPrice(getters.nameToCocktail(current)) * getters.nameToCocktail(current).quantity, 0)
      },
      cocktails(state, getters){
        function MP(cocktail){
          let sum = 0
          cocktail.ingredients.map(ingredient => getters.nameToIngredient(ingredient.name)).forEach(realIngredient => {
            if (getters.missingQuantities(realIngredient, cocktail) >= 0){
              sum += getters.missingQuantities(realIngredient, cocktail) * realIngredient.price
            }
          })
          return sum
        }
        return state.cocktails.map(cocktail => {
          let sum = 0
            cocktail.ingredients.forEach(ci => {
              let ingredient = getters.nameToIngredient(ci.name)
              sum += ingredient.price * ci.quantity
            })
          return {
            ...cocktail,
            cost: sum,
            missingPrice : MP(cocktail)
          }
        })
      },

      cocktailPrice(getters){
        let CP = function(cocktail){
          let sum = 0
            cocktail.ingredients.forEach(ci => {
              let ingredient = getters.nameToIngredient(ci.name)
              sum += ingredient.price * ci.quantity
            })
          return sum
        }
        return CP
      },
      
      nameToIngredient(state){
        return function(name){
          return state.ingredients.find(ingredient => ingredient.name == name)
        }
      },
      nameToCocktail(state){
        return function(name){
          return state.cocktails.find(cocktail => cocktail.name == name)
        }
      },
      missingQuantities(state){
        return function(ingredient, cocktail){
          return cocktail.ingredients.find(object => object.name == ingredient.name).quantity - ingredient.quantity
        }
      },
      missingPrice(state, getters){
        return function(cocktail){
          let sum = 0
          cocktail.ingredients.map(ingredient => getters.nameToIngredient(ingredient.name)).forEach(realIngredient => {
            if (getters.missingQuantities(realIngredient, cocktail) >= 0){
              sum += getters.missingQuantities(realIngredient, cocktail) * realIngredient.price
            }
          })
          return sum
        }
      },
      chosenIngredientsCost(state, getters){
        let array = state.chosenIngredients.map(name => getters.nameToIngredient(name))
        return array.reduce((accumulator, ingredient) => accumulator + (ingredient.price * ingredient.quantity), 0)
      },
  
      types: function(state){
        let array = []
        state.ingredients.forEach(ingredient => {
          if (!array.includes(ingredient.type)){
            array.push(ingredient.type)
          }
        })
        return array
      },
  
      selection: function(state){
        return state.selection
      },
      chosenType: function(state, getters){
        return state.ingredients.filter((item) => {return item.type == getters.selection})
      },
  
      chosen: function(state, getters){
        return state.chosenIngredients.map(chosen => getters.nameToIngredient(chosen))
      },
  
      possible: function(state, getters){
        return state.cocktails.filter(cocktail => (cocktail.ingredients.every(
          ingredient => {
            let realIngredient = getters.nameToIngredient(ingredient.name)
            return getters.missingQuantities(realIngredient, cocktail) <= 0
          }
        )))
      },
  
      atLeastOne: function(state, getters){
        return state.cocktails.filter(cocktail => (cocktail.ingredients.some(ingredient => (state.chosenIngredients.includes(ingredient.name)))) && !(getters.possible.includes(cocktail)))
      },
      missingIngredients: function(state, getters){
        let array = getters.atLeastOne.map(cocktail => {
          let missing = cocktail.ingredients.map(obj => getters.nameToIngredient(obj.name)).filter(realIngredient => getters.missingQuantities(realIngredient, cocktail) > 0)
          return {
            cocktail: cocktail,
            missing: missing,
            price: getters.missingPrice(cocktail)
          }
        })
        if (state.option == 'number'){
          return array.sort((a, b) => {
            if (a.missing.length < b.missing.length){return -1}
            else if (b.missing.length < a.missing.length){return 1}
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
        else if (state.option == 'cost') {
          return array.sort((a, b) => {
            if (a.price < b.price) {return -1}
              else if (b.price < a.price) {return 1}
              else {
                if (a.missing.length < b.missing.length){return -1}
                else if (b.missing.length < a.missing.length){return 1}
                else {
                  if (a.cocktail.name < b.cocktail.name) {return -1}
                  else {return 1}
                }
              }
          })
        }
        else {
          return array.sort((a, b) => a.cocktail.name < b.cocktail.name ? -1 : 1)
        }
      },
      combinedIngredients(state, getters){
        let array =[]
        state.chosenCocktails.forEach(name => {
          getters.nameToCocktail(name).ingredients.forEach(ingredient => {
            if (array.find(obj => obj.name == ingredient.name)){
              let obj = array.find(obj => obj.name == ingredient.name)
              let index = array.indexOf(obj)
              array[index].quantity += (ingredient.quantity * getters.nameToCocktail(name).quantity)
            }
            else {
              array.push({
                name: ingredient.name,
                quantity: (ingredient.quantity * getters.nameToCocktail(name).quantity),
                type: getters.nameToIngredient(ingredient.name).type
              })
            }
          })
        })
        if (state.optionCocktails == 'type'){
          return array.sort((a, b) => {
            if (a.type < b.type) {return -1}
            else if (b.type < a.type) {return 1}
            else {
              if (a.quantity < b.quantity) {return -1}
              else if (b.quantity < a.quantity) {return 1}
              else {
                if (a.name < b.name) {return -1}
                else {return 1}
              }
            }
          })
        }
        else if (state.optionCocktails == 'number'){
          return array.sort((a, b) => {
            if (a.quantity < b.quantity) {return -1}
            else if (b.quantity < a.quantity) {return 1}
            else {
              if (a.type < b.type) {return -1}
              else if (b.type < a.type) {return 1}
              else {
                if (a.name < b.name) {return -1}
                else {return 1}
              }
            }
          })
        }
        else {
          return array.sort((a, b) => a.name < b.name ? -1 : 1)
        }
      }
    },
    mutations: {
        removeCocktail(state, name){
          let cocktail = state.cocktails.find(cock => cock.name == name)
          if (cocktail.quantity > 1){
            cocktail.quantity -= 1
          }
          else {
            let ind = state.chosenCocktails.indexOf(name)
            state.chosenCocktails.splice(ind, 1)
          }
        },
        addCocktail(state, name){
          let cocktail = state.cocktails.find(cock => cock.name == name)
          if (!(state.chosenCocktails.includes(name))){
              state.chosenCocktails.push(name)
              cocktail.quantity = 1
          }
          else {
            cocktail.quantity += 1
          }
        },
        addIngredient(state, name){
          let ingredient = state.ingredients.find(chosen => chosen.name == name)
          if (!(state.chosenIngredients.includes(name))){
            state.chosenIngredients.push(name)
            ingredient.quantity += 1
          }
          else {
            ingredient.quantity += 1
          }
        },
        removeIngredient(state, name){
          let ingredient = state.ingredients.find(ingredient => ingredient.name == name)
          ingredient.quantity -= 1
          if (ingredient.quantity == 0) {
            let ind = state.chosenIngredients.indexOf(ingredient.name)
            state.chosenIngredients.splice(ind, 1)
          }
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