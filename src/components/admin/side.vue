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

        <li class="header">文章</li>
        <li class="pageLink" @click="toggleMenu"><router-link :to="{name: 'article', params: { aid: 'new' }}"><i class="fa fa-file-o"></i><span class="page">写文章</span></router-link></li>
        <li class="pageLink" @click="toggleMenu"><router-link :to="{name: 'articles'}"><i class="fa fa-list"></i><span class="page">全部文章</span></router-link></li>

        <li class="header">任务</li>
        <li class="pageLink" @click="toggleMenu"><router-link :to="{name: 'calendar'}"><i class="fa fa-calendar"></i><span class="page">日历</span></router-link></li>

        <li class="header">个人</li>
        <li class="pageLink" @click="toggleMenu"><router-link to="/tasks"><i class="fa fa-tasks"></i><span class="page">Tasks</span></router-link></li>
        <li class="pageLink" @click="toggleMenu"><router-link to="/setting"><i class="fa fa-cog"></i><span class="page">Settings</span></router-link></li>

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
      },
      toggleMenu: function (event) {
        window.$('li.pageLink').removeClass('active')
        event.toElement.parentElement.className = 'pageLink active'
      }
    }
  }
</script>
