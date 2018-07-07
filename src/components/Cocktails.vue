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
            <button @click="addCocktail(name)" :class="type" v-for="{name, type, cost} in cocktails" :key="name">
            {{ name | capitalize }} - €{{ cost | round}}
            </button>
        </div>
        <div v-show="chosenCocktails.length > 0" class="description">
            <h2>Chosen Cocktails!</h2>
            <button @click="removeCocktail(cocktail)"  :class="'cocktail'" v-for=" cocktail in chosenCocktails" :key="cocktail">
            {{ cocktail | capitalize }} {{nameToCocktail(cocktail).quantity}} 
            </button>
            <h2>The Cost of These Cocktails is €{{ totalCost | round}}</h2>
        </div>
        <div class="oneMore">
            <h3>You Need the following ingredients :</h3>
            <button class="ordering" @click="orderCocktails('type')">Type</button>
            <button class="ordering" @click="orderCocktails('number')">Number of missing ingredients</button>
            <button class="ordering" @click="orderCocktails('name')">Name</button>
            <div v-if="combinedIngredients.length > 0" class="missingIngredients">
                <button :class="type" v-for="{name, type, quantity} in combinedIngredients" :key="name">
                    {{name}} {{quantity}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState(['chosenCocktails']),

        ...mapGetters([
            'cocktails',
            'totalCost',
            'combinedIngredients',
            'nameToCocktail'
        ]),
    },
    methods: {
        ...mapActions(['addCocktail', 'removeCocktail', 'orderCocktails'])
    }
}
</script>

<style>
@import '../assets/styles.css'
</style>
