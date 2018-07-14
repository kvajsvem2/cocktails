<template>
    <div>
        <div class="ingredients">
            <div class="mainButton">
                <router-link to="/">Choose Your Ingredients</router-link>
                <router-link to="/cocktails">Choose Your Cocktails</router-link>
                <router-link to="/addingredient">New Ingredient</router-link>
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
    </div>
</template>

<script>
export default {
    data(){
        return {
            ingredient: {
                name: '',
                type: '',
                price: null,
                bitterSweet: null,
                alcohol: null
            }
        }
    },
    methods: {
        postIngredient(){
            this.$http.post('https://cocktails2-1f770.firebaseio.com/ingredients.json', this.ingredient).then(function(data){
                console.log(data)
                alert('you added a new item to ingredients!')
            })
        }
    }
}
</script>

<style>
@import '../assets/styles.css'
</style>
