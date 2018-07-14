// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { store } from './store/store'
import VueRouter from 'vue-router'
import Routes from './routes'
import VueResource from 'vue-resource'



Vue.use(VueResource)

Vue.use(VueRouter)

const router = new VueRouter({
  routes: Routes
})



//filters
Vue.filter('capitalize', (value) => {
  if (value == 'soft-drink'){
    return 'Soft drink'
  }
  else {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
})

Vue.filter('plural', value => {
  return value + 's'
})

Vue.filter('round', value => {
  return value.toFixed(2)
})



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  render: h => h(App),
  router: router,
  components: { App },
  template: '<App/>'
})
