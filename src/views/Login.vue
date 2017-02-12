<template>
  <div class="container">
    <div class="login-box" v-loading="loading">
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
        loading: false,
        email: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        this.loading = true
        this.$store.commit('TOGGLE_LOADING')
        this.$http.post('auth/local/login', {email: this.email, password: this.password}).then(response => {
          window.console.log(response.data)
          this.$store.commit('SET_TOKEN', response.data.token)
          this.$store.commit('SET_USER', response.data.user)
          if (window.localStorage) {
            window.localStorage.setItem('token', response.data.token)
            window.localStorage.setItem('user', JSON.stringify(response.data.user))
          }
          this.loading = false
          let redirect = decodeURIComponent(this.$route.query.redirect || '/admin')
          this.$router.push({ path: redirect })
        }, response => {
          var msg = response.data.error_msg || '登录失败'
          this.$message.error(msg)
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
