// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './vuex/store'
import filters from './utils/filters'
import routes from './routes'
import AppView from './views/App.vue'
import config from '../config'
import ElementUI from 'element-ui'
import VueSimplemde from 'vue-simplemde'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueSimplemde)

Vue.http.options.crossOrigin = true
Vue.http.options.credentials = true
Vue.http.options.root = config.dev.env.API_ROOT
Vue.http.interceptors.push((request, next) => {
  // 这里对请求体进行处理
  request.headers = request.headers || {}
  if (window.localStorage && window.localStorage.getItem('token')) {
    Vue.http.headers.common.Authorization = 'Bearer ' + window.localStorage.getItem('token').replace(/(^")|("$)/g, '')
  }
  next((response) => {
    // if (response.status === 401) {
    //   if (window.localStorage) {
    //     window.localStorage.setItem('token', null)
    //   }
      // router.go({path: '/login'})
    // }
  })
})

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

const router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

if (window.localStorage) {
  if (store.state.token !== window.localStorage.getItem('token')) {
    store.commit('SET_USER', JSON.parse(window.localStorage.getItem('user')))
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  }
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

new Vue({
  router: router,
  store: store,
  render: h => h(AppView)
}).$mount('#root')

