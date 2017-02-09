const Home = resolve => {
  require.ensure(['./views/Home.vue'], () => {
    resolve(require('./views/Home.vue'))
  })
}

import LoginView from './views/Login.vue'
import RegisterView from './views/Register.vue'
import NotFoundView from './views/NotFound.vue'
import AdminView from './views/Admin.vue'

const routers = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        description: 'Overview of environment'
      }
    ]
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '*',
    component: NotFoundView
  }
]

export default routers
