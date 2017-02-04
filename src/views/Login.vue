<template>
  <div class="container">
    <div class="login-box">
      <div class="login-logo">
        <router-link to="/">Sign in <b>Chalk</b></router-link>
      </div>
      <!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg">Sign in to start</p>
        <form action="../../index2.html" method="post">
          <div class="form-group has-feedback">
            <input type="email" class="form-control" placeholder="Email">
            <span class="fa fa-envelope form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input type="password" class="form-control" placeholder="Password">
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
        username: '',
        password: '',
        response: ''
      }
    },
    methods: {
      checkCreds: function () {
        //  Change submit button
        var self = this
        var store = this.$store

        this.toggleLoading()
        this.resetResponse()
        store.dispatch('TOGGLE_LOADING')

        //  Login
        this.$parent.callAPI('POST', '/login', { username: this.username, password: this.password }).then(function (response) {
          store.dispatch('TOGGLE_LOADING')

          if (response.data) {
            var data = response.data

            if (data.error) {
              if (data.error.name) { //  Object from LDAP at this point
                switch (data.error.name) {
                  case 'InvalidCredentialsError' : self.response = 'Username/Password incorrect. Please try again.'; break
                  default: self.response = data.error.name
                }
              } else {
                self.response = data.error
              }
            } else {
              //  success. Let's load up the dashboard
              if (data.user) {
                store.dispatch('SET_USER', data.user)
                var token = 'Bearer ' + data.token
                store.dispatch('SET_TOKEN', token)

                // Save to local storage as well
                if (window.localStorage) {
                  window.localStorage.setItem('user', JSON.stringify(data.user))
                  window.localStorage.setItem('token', token)
                }

                this.$router.push(data.redirect)
              }
            }
          } else {
            self.response = 'Did not receive a response. Please try again in a few minutes'
          }

          self.toggleLoading()
        }, function (response) {
          // error
          store.dispatch('TOGGLE_LOADING')
          console.log('Error', response)
          self.response = 'Server appears to be offline'
          self.toggleLoading()
        })
      },
      toggleLoading: function () {
        this.loading = (this.loading === '') ? 'loading' : ''
      },
      resetResponse: function () {
        this.response = ''
      }
    }
  }
</script>

<style scoped>

</style>
