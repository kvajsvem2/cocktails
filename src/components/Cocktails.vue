<template>
    <div>
        <div class="ingredients">
            <div class="mainButton">
                <router-link to="/">Choose Your Ingredients</router-link>
                <router-link to="/cocktails">Choose Your Cocktails</router-link>
            </div>
        </div>
        <div class="options">
            <h2>Available Cocktails</h2>
            <button @click="addCocktail(cocktail)" :class="cocktail.type" v-for="cocktail in cocktails" :key="cocktail">
            {{ cocktail.name | capitalize }} - €{{cocktailCost(cocktail) | round}}
            </button>
        </div>
        <div v-show="chosenCocktails.length > 0" class="description">
            <h2>Chosen Cocktails!</h2>
            <button @click="removeCocktail(object)"  :class="object.cocktail.type" v-for=" object in chosenCocktails" :key="object">
            {{ object.cocktail.name | capitalize }} {{object.quantity}} 
            </button>
            <h2>The Cost of These Cocktails is €{{ totalCost | round}}</h2>
        </div>
        <div class="oneMore">
            <h3>You Need the following ingredients :</h3>
            <button @click="changeSortingOrder(1)" class="ordering">Type</button>
            <button @click="changeSortingOrder(2)" class="ordering">Number of Cocktails</button>
            <button @click="changeSortingOrder(3)" class="ordering">Name</button>
            <div class="missingIngredients" v-for="item in ingredientToCocktail" :key="item">
                <div class="firstBox">
                    <button :class="item.type">{{item.name | capitalize}}</button>
                </div>
                <p> is in :</p>
                <div class="secondBox">
                    <button :class="cocktail.type" v-for="cocktail in whichCocktails(item)" :key="cocktail">{{ cocktail.name }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    computed: {
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
            'nameToIngredient',
            'cocktails',
            'cocktailCost',
            'chosenCocktails',
            'totalCost',
            'ingredientToCocktail',
            'whichCocktails',
            'sortIngredients',
            'sortingOption'
        ]),
    },
    methods: {
        ...mapActions(['changeSortingOrder', 'addCocktail', 'removeCocktail'])
    }
}
</script>

<style>
@import '../assets/styles.css'
</style>
