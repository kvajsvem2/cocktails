import Vue from 'vue'
import Vuex from 'vuex'
import constant from './constants'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {

        cocktails: constant.cocktails,

        ingredients: constant.ingredients,

        option: '',

        selection: 'fruit',

        chosenIngredients: [],

        chosenCocktails: [],

        sortingOption: 3
    },
    getters: {
      sortingOption(state){
        return state.sortingOption
      },
      sortIngredients(state, getters){
        function SI(array){
            if (state.sortingOption == 1){
                return array.sort((a, b) => a.type < b.type ? -1 : 1)
            }
            else if (state.sortingOption == 2){
                return array.sort((a, b) => (getters.whichCocktails(a).length) < (getters.whichCocktails(b).length) ? -1 : 1)
            }
            else {
                return array.sort((a, b) => a.name < b.name ? -1 : 1)
            }
        }
        return SI
      },
      whichCocktails(state){
        function WC(ingredient){
            return state.cocktails.filter(cocktail => cocktail.ingredients.some(object =>  object.name == ingredient.name))
        }
        return WC
      },
      ingredientToCocktail(state, getters){
        let array = []
        state.chosenCocktails.forEach(object => object.cocktail.ingredients.forEach(ingredient => {
            let element = getters.nameToIngredient(ingredient.name)
            if (!array.includes(element)){
                array.push(element)
            }
        }))
        return getters.sortIngredients(array)
      },
      totalCost(state, getters){
        return state.chosenCocktails.reduce((acc, current) => acc + getters.cocktailCost(current.cocktail) * current.quantity, 0)
      },
      chosenCocktails(state){
        return state.chosenCocktails
      },
      cocktails(state){
        return state.cocktails
      },
      cocktailCost(state, getters){
        function CC(cocktail){
            let sum = 0
            cocktail.ingredients.forEach(object => {
              let ingredient = getters.nameToIngredient(object.name)
              sum += ingredient.price * object.quantity
            })
            return sum
        }
        return CC
      },
      nameToIngredient(state){
        function NI(name){
          return state.ingredients.find(ingredient => ingredient.name == name)
        }
        return NI
      },
      missingQuantities(state){
        function MQ(ingredient, cocktail){
          return cocktail.ingredients.find(object => object.name == ingredient.name).quantity - ingredient.quantity
        }
        return MQ
      },
      missingPrice(state, getters){
        function MP(cocktail){
          let sum = 0
          cocktail.ingredients.map(ingredient => getters.nameToIngredient(ingredient.name)).forEach(realIngredient => {
            if (getters.missingQuantities(realIngredient, cocktail) >= 0){
              sum += getters.missingQuantities(realIngredient, cocktail) * realIngredient.price
            }
          })
          return sum
        }
        return MP
      },
      chosenIngredientsCost(state, getters){
        let array = state.chosenIngredients.map(name => getters.nameToIngredient(name))
        return array.reduce((accumulator, ingredient) => accumulator + (ingredient.price * ingredient.quantity), 0)
      },
      option(state){
        return state.option
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
  
      chosenIngredients: function(state){
        return state.chosenIngredients
      },
  
      selection: function(state){
        return state.selection
      },
      chosenType: function(state, getters){
        return state.ingredients.filter((item) => {return item.type == getters.selection})
      },
  
      chosen: function(state, getters){
        return getters.chosenIngredients.map(chosen => getters.nameToIngredient(chosen))
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
        return state.cocktails.filter(cocktail => (cocktail.ingredients.some(ingredient => (getters.chosenIngredients.includes(ingredient.name)))) && !(getters.possible.includes(cocktail)))
      },
      missingIngredients: function(state, getters){
        let array = getters.atLeastOne.map(cocktail => {
          let missing = cocktail.ingredients.map(object => getters.nameToIngredient(object.name)).filter(realIngredient => getters.missingQuantities(realIngredient, cocktail) > 0)
          return {
            cocktail: cocktail,
            missing: missing,
            price: getters.missingPrice(cocktail)
          }
        })
        if (state.option == 'number'){
          return array.sort((a, b) => a.missing.length < b.missing.length ? -1 : 1)
        }
        else if (state.option == 'cost') {
          return array.sort((a, b) => a.price < b.price ? -1 : 1)
        }
        else {
          return array.sort((a, b) => a.cocktail.name < b.cocktail.name ? -1 : 1)
        }
      }
    },
    mutations: {
        removeCocktail(state, object){
          if (object.quantity > 1){
            object.quantity -= 1
          }
          else {
            let ind = state.chosenCocktails.indexOf(object)
            state.chosenCocktails.splice(ind, 1)
          }
        },
        addCocktail(state, cocktail){
          if (!(state.chosenCocktails.some(object => object.cocktail == cocktail))){
              state.chosenCocktails.push({
                cocktail: cocktail,
                quantity: 1
              })
          }
          else {
            state.chosenCocktails.find(object => object.cocktail == cocktail).quantity += 1
          }
        },
        changeSortingOrder(state, option){
          state.sortingOption = option
        },
        addItem(state, ingredient){
          if (!(state.chosenIngredients.includes(ingredient.name))){
            state.chosenIngredients.push(ingredient.name)
            ingredient.quantity += 1
          }
          else {
            ingredient.quantity += 1
          }
        },
        remove(state, ingredient){
          var ind = state.chosenIngredients.indexOf(ingredient.name)
          if (ingredient.quantity > 0) {
            ingredient.quantity -= 1
            if (ingredient.quantity == 0){
              state.chosenIngredients.splice(ind, 1)
            }
          } 
        },
        select(state, type){
            state.selection = type
        },
        order(state, option){
          state.option = option
        }
    },
    actions: {
        removeCocktail(context, object){
          context.commit('removeCocktail', object)
        },
        addCocktail(context, cocktail){
          context.commit('addCocktail', cocktail)
        },
        changeSortingOrder(context, option){
          context.commit('changeSortingOrder', option)
        },
        addItem({ commit }, name){
            commit('addItem', name)
        },
        remove(context, name){
            context.commit('remove', name)
        },
        select(context, type){
            context.commit('select', type)
        },
        order(context, option){
          context.commit('order', option)
        }
    }
})