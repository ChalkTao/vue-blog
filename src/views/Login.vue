<template>
  <div class="container">
    <div class="login-box">
      <div class="login-logo">
        <router-link to="/">Sign in <b>Chalk</b></router-link>
      </div>
      <!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg">Sign in to start</p>
        <form @submit.prevent="login()">
          <div class="form-group has-feedback">
            <input type="email" class="form-control" placeholder="Email" v-model="email">
            <span class="fa fa-envelope form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input type="password" class="form-control" placeholder="Password" v-model="password">
            <span class="fa fa-lock form-control-feedback"></span>
          </div>
          <div class="row">

            <!-- /.col -->
            <div class="col-xs-4 col-xs-offset-8">
              <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
            </div>
            <!-- /.col -->
          </div>
        </form>

        <router-link :to="{name:'register'}" class="text-center">Register a new membership</router-link>

      </div>
      <!-- /.login-box-body -->
    </div>
  </div>
</template>

<script>
  require('../assets/scss/login.scss')

  module.exports = {
    name: 'Login',
    data: function (router) {
      return {
        section: 'Login',
        loading: '',
        email: '',
        password: '',
        response: ''
      }
    },
    methods: {
      login: function () {
        this.toggleLoading()
        this.resetResponse()
        this.$store.commit('TOGGLE_LOADING')
        this.$http.post('local/login', {foo: 'bar'}).then(response => {
          window.console.log(response.data)
        }, response => {
          // error callback
        })
      },
      toggleLoading: function () {
        this.loading = (this.loading === '') ? 'loading' : ''
      },
      resetResponse: function () {
        this.response = ''
      },
      showMsg: function (title, desc) {
        window.console.log(title)
      }
    }
  }
</script>

<style scoped>

</style>
