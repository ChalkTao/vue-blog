<template>
  <div>
    <AdminHeader v-show="show"></AdminHeader>
    <AdminSide v-show="show"></AdminSide>
    <router-view></router-view>
    <NvTop></NvTop>
  </div>
</template>

<script>
  import AdminHeader from '../components/admin/head.vue'
  import AdminSide from '../components/admin/side.vue'
  import NvTop from '../components/backtotop.vue'
  export default {
    name: 'App',
    components: {AdminHeader, AdminSide, NvTop},
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
      },
      logout: function () {
        this.$store.commit('SET_USER', '')
        this.$store.commit('SET_TOKEN', '')
        if (window.localStorage) {
          window.localStorage.setItem('user', '')
          window.localStorage.setItem('token', '')
        }
        this.$router.push('/login')
      }
    },
    mounted () {
      let tmpDate = new Date()
      let year = tmpDate.getFullYear()
      let month = this.fill(tmpDate.getMonth() + 1)
      let day = this.fill(tmpDate.getDate())
      let date = year + '-' + month + '-' + day
      this.$http.get('task/daily/' + date).then(response => {
        this.$store.commit('SET_TASKS', response.data.data.tasks)
      }, response => {
        var msg = (response.data && response.data.error_msg) || '获取失败'
        this.$message.error(msg)
      })
      this.$http.get('config/imageDomain').then(response => {
        this.$store.commit('SET_DOMAIN', response.data.domain)
      }, response => {
        var msg = (response.data && response.data.error_msg) || '获取失败'
        this.$message.error(msg)
      })
    }
  }
</script>
