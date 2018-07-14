<template>
  <div>
    <div class="ingredients">
      <div class="mainButton">
            <router-link to="/">Choose Your Ingredients</router-link>
            <router-link to="/cocktails">Choose Your Cocktails</router-link>
            <router-link to="/addingredient">New Ingredient</router-link>
        </div>
      <button v-for="item in types" @click="select(item)" :class="item" :key="item">
        {{ item | capitalize | plural }}
      </button>
      <input type="text" placeholder="search ingredients" v-model="searchIngredients" />
      <div class="options">
        <button @click="addIngredient(name)" :class="type" v-for="{name, type, price} in filteredChosenType" :key="name">
          {{ name | capitalize }} - €{{price}}
        </button>
      </div>
    </div>
    <div class="description">
      <h2 v-show="chosenIngredients.length > 0">Chosen Ingredients!</h2>
      <button @click="removeIngredient(name)" :class="type" v-for="{name, type} in chosenIngredients" :key="name">
        {{ name | capitalize }} {{ingredientQuantities[name]}}
      </button>
      <h2 v-show="chosenIngredients.length > 0">The Cost of These Ingredients is €{{ chosenIngredientsCost | round }}</h2>
    </div>
    <div class="result">
      <h2 v-show="possible.length > 0">You Can Make:</h2>
      <button :class="type" v-for="{name, type} in possible" :key="name">
        {{ name | capitalize }}
      </button>
    </div>
    <div class="oneMore">
      <h2 v-show="atLeastOne.length > 0">These Cocktails include at least one of the chosen ingredients:</h2>
      <button class="ordering" @click="order('cost')">Cost</button>
      <button class="ordering" @click="order('number')">Number of missing ingredients</button>
      <button class="ordering" @click="order('name')">Name</button>
      <input type="text" placeholder="search Cocktails" v-model="searchCocktails" />
      <div class="missingIngredients" v-for="{cocktail, price, missing} in filteredMissingIngredients" :key="cocktail.name">
        <div class="firstBox">
          <button class="cocktail">{{ cocktail.name | capitalize }}</button>
        </div>
        <p>You Are Missing:</p>
        <div class="secondBox">
          <button :class="type" v-for="{name, type} in missing" :key="name">
            {{ name | capitalize }} {{missingQuantities(name, cocktail)}}
          </button>
        </div>
        <p> €{{ price | round }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data(){
    return {
      searchIngredients: '',

      searchCocktails: ''
    }
  },
  computed: {

    ...mapState(['ingredientQuantities']),

    ...mapGetters([
      'types',
      'chosenIngredients',
      'possible',
      'atLeastOne',
      'missingIngredients',
      'chosenType',
      'chosenIngredientsCost',
      'missingQuantities',
    ]),
    filteredChosenType: function(){
      return this.chosenType.filter(item => item.name.match(this.searchIngredients))
    },
    filteredMissingIngredients: function(){
      return this.missingIngredients.filter(item => item.cocktail.name.match(this.searchCocktails))
    }
  },
  methods: {
    ...mapActions(['addIngredient', 'removeIngredient', 'select', 'order'])
  }
}
</script>

<style>
@import '../assets/styles.css'
</style>