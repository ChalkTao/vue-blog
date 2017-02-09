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

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.crossOrigin = true
Vue.http.options.credentials = true
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true
Vue.http.options.root = config.dev.env.API_ROOT
Vue.http.interceptors.push((request, next) => {
  // 这里对请求体进行处理
  request.headers = request.headers || {}
  request.headers.set('X-CSRF-TOKEN', 'TOKEN')
  if (window.localStorage && window.localStorage.getItem('token')) {
    request.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token').replace(/(^")|("$)/g, '')
  }
  next((response) => {
    if (response.status === 401) {
      if (window.localStorage) {
        window.localStorage.setItem('token', null)
      }
      window.router.go({path: '/login'})
    }
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

router.beforeEach((to, from, next) => {
  // window.console.log('Transition', transition)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    window.console.log('Not authenticated')
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
window.router = router
