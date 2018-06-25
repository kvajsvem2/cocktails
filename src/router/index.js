import Vue from 'vue'
import Router from 'vue-router'
import Ingridients from '../components/Ingridients.vue'
import Cocktails from '../components/Cocktails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ingridients', components: Ingridients
    },
    {
      path: '/cocktails', component: Cocktails
    },
  ]
})
