<template>
    <div>
        <div class="ingredients">
            <div class="mainButton">
                <router-link to="/">Choose Your Ingredients</router-link>
                <router-link to="/cocktails">Choose Your Cocktails</router-link>
                <router-link to="/addingredient">New Ingredients and Cocktails</router-link>
            </div>
        </div>
        <h1>Add a New Ingredient!</h1>
        <div class="form">
            <form @submit="postIngredient">
                <label>Ingredient Name</label>
                <input type="text" v-model="ingredient.name" required />
                <label>Ingredient Type</label>
                <input type="text" v-model="ingredient.type" required />
                <label>Ingredient Price</label>
                <input type="number" v-model="ingredient.price" required />
                <label>Ingredient bitterSweet index</label>
                <input type="float" v-model="ingredient.bitterSweet" required />
                <label>Ingredient Alcohol Potency</label>
                <input type="number" v-model="ingredient.alcohol" required />
                <button>Add Ingredient</button>
            </form>
        </div>
        <h1>Delete an Ingredient from DB</h1>
        <div class="displayIngredients">
            <button  :key="key" v-for="{name, key} in ingredients" class="cocktail">{{ name }}</button>
        </div>
        <h1>Add a New Cocktail!</h1>
        <div class="displayIngredients">
            <form>
                <label>Cocktail Name</label>
                <input type="text" />
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    
    data(){
        return {
            ingredient: {
                name: '',
                type: '',
                price: null,
                bitterSweet: null,
                alcohol: null
            },
            ingredients: []
        }
    },
    methods: {
        postIngredient(){
            axios.post('http://localhost:8080/#/addingredient', this.ingredient).then(function(response){
                console.log(response)
            }).catch(error => console.log(error))
        },
    }
}
</script>

<style>
@import '../assets/styles.css'
</style>
