const Home = resolve => {
  require.ensure(['./views/App.vue'], () => {
    resolve(require('./views/App.vue'))
  })
}

const NotFound = resolve => {
  require.ensure(['./views/NotFound.vue'], () => {
    resolve(require('./views/NotFound.vue'))
  })
}

const routers = [{
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '*',
  component: NotFound
}]

export default routers
