import Ingredients from './components/Ingredients'
import Cocktails from './components/Cocktails'
import AddIngredient from './components/AddIngredient'

export default [
    {path: '/', component: Ingredients},
    {path: '/cocktails', component: Cocktails},
    {path: '/addingredient', component: AddIngredient}
]