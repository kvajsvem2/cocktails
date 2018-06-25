<template>
  <div>
    <div class="ingredients">
      <div class="mainButton">
            <router-link to="/">Choose Your Ingredients</router-link>
            <router-link to="/cocktails">Choose Your Cocktails</router-link>
        </div>
      <button v-for="item in types" @click="select(item)" :class="item" :key="item">{{ item | capitalize | plural }}</button>
      <input type="text" placeholder="search ingredients" v-model="search" />
      <div class="options">
        <button @click="addItem(item)" :class="item.type" v-for="item in filteredChosenType" :key="item">
          {{ item.name | capitalize }} - €{{item.price}}
        </button>
      </div>
    </div>
    <div v-show="chosenIngredients.length > 0" class="description">
      <h2>Chosen Ingredients!</h2>
      <button @click="remove(item)" :class="item.type" v-for="item in chosen" :key="item">
        {{ item.name | capitalize }} {{item.quantity}}
      </button>
      <h2>The Cost of These Ingredients is €{{ chosenIngredientsCost | round }}</h2>
    </div>
    <div class="result" v-show="possible.length > 0">
      <h2>You Can Make:</h2>
      <button :class="item.type" v-for="item in possible" :key="item">
        {{ item.name | capitalize }}
      </button>
    </div>
    <div class="oneMore">
      <h2 v-show="atLeastOne.length > 0">These Cocktails include at least one of the chosen ingredients:</h2>
      <button class="ordering" @click="order('cost')">Cost</button>
      <button class="ordering" @click="order('number')">Number of missing ingredients</button>
      <button class="ordering" @click="order('name')">Name</button>
      <input type="text" placeholder="search Cocktails" v-model="searchCocktails" />
      <div class="missingIngredients" v-for="item in filteredMissingIngredients" :key="item">
        <div class="firstBox">
          <button class="cocktail">{{ item.cocktail.name | capitalize }}</button>
        </div>
        <p>You Are Missing:</p>
        <div class="secondBox">
          <button :class="ingredient.type" v-for="ingredient in item.missing" :key="ingredient">
            {{ ingredient.name | capitalize }} {{missingQuantities(ingredient, item.cocktail)}}
          </button>
        </div>
        <p> €{{ missingPrice(item.cocktail) | round }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data(){
    return {
      search: '',

      searchCocktails: ''
    }
  },
  computed: {
    ...mapState([
      'option',
      'chosenIngredients'
      ]),
    ...mapGetters([
      'types',
      'chosenIngredients',
      'selection',
      'chosen',
      'possible',
      'atLeastOne',
      'missingIngredients',
      'chosenType',
      'chosenIngredientsCost',
      'missingQuantities',
      'missingPrice',
      'nameToIngredient'
    ]),
    filteredChosenType: function(){
      return this.chosenType.filter(item => item.name.match(this.search))
    },
    filteredMissingIngredients: function(){
      return this.missingIngredients.filter(item => item.cocktail.name.match(this.searchCocktails))
    }
  },
  methods: {
    ...mapActions(['addItem', 'remove', 'select', 'order'])
  }
}
</script>

<style>
@import '../assets/styles.css'
</style>