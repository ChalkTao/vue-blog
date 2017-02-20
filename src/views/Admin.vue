<template>
  <div>
    <AdminHeader v-show="show"></AdminHeader>
    <AdminSide v-show="show"></AdminSide>
    <router-view></router-view>
  </div>
</template>

<script>
  import AdminHeader from '../components/admin/head.vue'
  import AdminSide from '../components/admin/side.vue'
  export default {
    name: 'App',
    components: {AdminHeader, AdminSide},
    data: function () {
      return {
        section: 'Head',
        callingAPI: false,
        show: true
      }
    },
    methods: {
      fullScreen: function (fullScreen) {
        this.show = !fullScreen
      },
      formatDate: function (time) {
        let tmpDate = new Date(time)
        let year = tmpDate.getFullYear()
        let month = this.fill(tmpDate.getMonth() + 1)
        let day = this.fill(tmpDate.getDate())
        return year + '-' + month + '-' + day
      },
      fill: function (num) {
        return num >= 10 ? num : '0' + num
      }
//      logout: function () {
//        this.$store.dispatch('SET_USER', null)
//        this.$store.dispatch('SET_TOKEN', null)
//
//        if (window.localStorage) {
//          window.localStorage.setItem('user', null)
//          window.localStorage.setItem('token', null)
//        }
//
//        this.$router.push('/login')
//      }
    }
  }
</script>
