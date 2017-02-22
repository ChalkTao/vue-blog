import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  callingAPI: false,
  searching: '',
  serverURI: 'http://10.110.1.136:8080',
  user: null,
  token: null,
  tasks: [],
  uptoken: '',
  domain: ''
}

const mutations = {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_UPTOKEN (state, token) {
    state.uptoken = token
  },
  SET_DOMAIN (state, domain) {
    state.domain = domain
  },
  SET_TASKS (state, tasks) {
    state.tasks = tasks
  }
}

export default new Vuex.Store({
  state,
  mutations
})
