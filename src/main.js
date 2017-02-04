// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'
import filters from './utils/filters'
import routes from './routes'
import $ from 'webpack-zepto'
import AppView from './views/App.vue'

Vue.use(VueRouter)
$.ajaxSettings.crossDomain = true
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router: router,
  store: store,
  render: h => h(AppView)
}).$mount('#root')
window.router = router
