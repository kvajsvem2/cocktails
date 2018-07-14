<template>
    <div>
        <div class="ingredients">
            <div class="mainButton">
                <router-link to="/">Choose Your Ingredients</router-link>
                <router-link to="/cocktails">Choose Your Cocktails</router-link>
                <router-link to="/addingredient">New Ingredient</router-link>
            </div>
        </div>
        <div class="options">
            <h2>Available Cocktails</h2>
            <button @click="addCocktail(name)" :class="type" v-for="{name, type, cost} in cocktails" :key="name">
            {{ name | capitalize }} - €{{ cost | round }}
            </button>
        </div>
        <div class="description">
            <h2 v-show="chosenCocktails.length > 0">Chosen Cocktails!</h2>
            <button @click="removeCocktail(name)"  :class="'cocktail'" v-for=" {name} in chosenCocktails" :key="name">
            {{ name | capitalize }} {{cocktailQuantities[name]}} 
            </button>
            <h2 v-show="chosenCocktails.length > 0">The Cost of These Cocktails is €{{ totalCost | round }}</h2>
        </div>
        <div class="oneMore">
            <h3>You Need the following ingredients :</h3>
            <button class="ordering" @click="orderCocktails('type')">Type</button>
            <button class="ordering" @click="orderCocktails('number')">Number of missing ingredients</button>
            <button class="ordering" @click="orderCocktails('name')">Name</button>
            <div class="missingIngredients">
                <button v-show="quantity > 0" :class="type" v-for="{name, type, quantity} in combinedIngredients" :key="name">
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
        ...mapState(['cocktailQuantities']),

        ...mapGetters([
            'cocktails',
            'totalCost',
            'combinedIngredients',
            'chosenCocktails'
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
