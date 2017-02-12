<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <form @submit.prevent="search()" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="search" id="search" class="search form-control" data-toggle="hideseek" placeholder="Search Menus" data-list=".sidebar-menu">
          <span class="input-group-btn">
            <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
          </span>
        </div>
      </form>

      <ul class="sidebar-menu">
        <li class="active pageLink" @click="toggleMenu"><router-link :to="{name: 'admin_dashboard'}"><i class="fa fa-desktop"></i><span class="page">首页</span></router-link></li>
        <li class="treeview">
          <a href="#"><i class="fa fa-book"></i>
            <span>文章</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" style="display: none;">
            <li><router-link :to="{name: 'article_new'}"><i class="fa fa-file-o"></i> 写文章</router-link></li>
            <li><a href="../../index2.html"><i class="fa fa-circle-o"></i> 文章列表</a></li>
          </ul>
        </li>
        <li class="header">文章</li>
        <li class="pageLink" @click="toggleMenu"><router-link to="/tables"><i class="fa fa-table"></i><span class="page">Tables</span></router-link></li>

        <li class="header">ME</li>
        <li class="pageLink" @click="toggleMenu"><router-link to="/tasks"><i class="fa fa-tasks"></i><span class="page">Tasks</span></router-link></li>
        <li class="pageLink" @click="toggleMenu"><router-link to="/setting"><i class="fa fa-cog"></i><span class="page">Settings</span></router-link></li>

        <li class="header">LOGS</li>
        <li class="pageLink" @click="toggleMenu"><router-link to="/access"><i class="fa fa-book"></i><span class="page">Access</span></router-link></li>
        <li class="pageLink" @click="toggleMenu"><router-link to="/server"><i class="fa fa-hdd-o"></i><span class="page">Server</span></router-link></li>
        <li class="pageLink" @click="toggleMenu"><router-link to="/repos"><i class="fa fa-heart"></i><span class="page">Repos</span><small class="label pull-right bg-green">AJAX</small></router-link></li>

        <li class="header">PAGES</li>
        <li class="pageLink" @click="toggleMenu"><router-link to="/login"><i class="fa fa-circle-o text-yellow"></i> <span class="page">Login</span></router-link></li>
        <li class="pageLink" @click="toggleMenu"><router-link to="/404"><i class="fa fa-circle-o text-red"></i> <span class="page">404</span></router-link></li>
      </ul>
    </section>

  </aside>
</template>
<script>
  module.exports = {
    data: function () {
      return {
      }
    },
    computed: {
    },
    methods: {
      search: function () {
      }
    }
  }
</script>
