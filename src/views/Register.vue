<template>
  <div class="register-box">
    <div class="register-logo">
      <router-link to="/">Register <b>Chalk</b></router-link>
    </div>

    <div class="register-box-body" v-loading="loading">
      <p class="login-box-msg">Register a new membership</p>

      <form @submit.prevent="register()">
        <div class="form-group has-feedback">
          <input type="text" class="form-control" placeholder="Nickname" v-model="nickname" required>
          <span class="fa fa-user-circle-o form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="email" class="form-control" placeholder="Email" v-model="email" required>
          <span class="fa fa-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Password" v-model="password" required>
          <span class="fa fa-lock form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Admin Password" v-model="admin" required>
          <span class="fa fa-sign-in form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-4 col-xs-offset-8">
            <button type="submit" class="btn btn-primary btn-block btn-flat">Register</button>
          </div>
        </div>
      </form>

      <router-link :to="{name:'login'}" class="text-center">I already have a membership</router-link>
    </div>
  </div>
</template>

<script>
  require('../assets/scss/login.scss')

  module.exports = {
    name: 'Register',
    data: function (router) {
      return {
        loading: false,
        nickname: '',
        email: '',
        password: '',
        admin: ''
      }
    },
    methods: {
      register: function () {
        this.loading = true
        this.$http.post('auth/local/register', {
          nickname: this.nickname,
          email: this.email,
          password: this.password,
          admin: this.admin
        }).then(response => {
          window.console.log(response.data)
          this.$store.commit('SET_TOKEN', response.data.token)
          this.$store.commit('SET_USER', response.data.user)
          if (window.localStorage) {
            window.localStorage.setItem('token', response.data.token)
            window.localStorage.setItem('user', JSON.stringify(response.data.user))
          }
          this.loading = false
          this.$router.push({name: 'admin'})
        }, response => {
          var msg = (response.data && response.data.error_msg) || '注册失败'
          this.$message.error(msg)
          this.loading = false
        })
      }
    }
  }
</script>
