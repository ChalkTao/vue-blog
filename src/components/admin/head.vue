<template>
  <header class="main-header">
    <a href="/" class="logo">
      <!-- mini logo for sidebar mini 40x50 pixels -->
      <span class="logo-mini"><b>C</b></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>Chalk</b>Blog</span>
    </a>

    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">

          <!-- Tasks Menu -->
          <li class="dropdown tasks-menu">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-flag-o"></i>
              <span class="label label-danger">{{ state.tasks | count }} </span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">{{ state.tasks | count }} 个未完成任务</li>
              <li v-if="state.tasks.length > 0">
                <ul class="menu">
                  <li v-for="item in state.tasks">
                    <router-link :to="{name: 'task', params: { day: 'now' }}">
                      <h3>
                        {{item.content}}
                        <small class=" pull-right label label-default"> {{item.category}}</small>
                      </h3>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="footer" v-if="state.tasks.length > 0">
                <router-link :to="{name: 'task', params: { day: 'now' }}">查看所有任务</router-link>
              </li>
            </ul>
          </li>

          <!-- User Account Menu -->
          <li class="dropdown user user-menu">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
              <span class="hidden-xs">{{ state.user.nickname }}</span>
            </a>
          </li>
          <li class="dropdown user user-menu">
            <a @click="signout">
              <i class="fa fa-sign-out"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  module.exports = {
    data: function () {
      return {
      }
    },
    computed: {
      store: function () {
        return this.$parent.$store
      },
      state: function () {
        return this.store.state
      }
    },
    methods: {
      signout: function () {
        this.$parent.logout()
      }
    }
  }
</script>
