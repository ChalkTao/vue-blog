<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        <router-link :to="{name: 'task', params: {day: prevDay}}"><i class="fa fa-caret-left"></i></router-link>
        {{currentDay}}
        <router-link :to="{name: 'task', params: {day: nextDay}}"><i class="fa fa-caret-right"></i></router-link>
        <!--<small>任务</small>-->
        <button type="button" class="btn btn-sm btn-default" v-show="today !== currentDay">
          <router-link :to="{name: 'task', params: {day: today}}">
            <i class="fa fa-home"></i> 今日
          </router-link>
        </button>
      </h1>
    </section>

    <section class="content" v-loading="loading">
      <div class="row">
        <section class="col-lg-6">
          <Task :day="currentDay"></Task>
        </section>
        <section class="col-lg-6">
          <Goal :day="currentDay"></Goal>
          <Schedule :day="currentDay"></Schedule>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
  import Task from '../components/admin/task.vue'
  import Goal from '../components/admin/goal.vue'
  import Schedule from '../components/admin/schedule.vue'
  export default {
    components: {
      Task, Goal, Schedule
    },
    data () {
      return {
        loading: false,
        currentDay: '',
        today: this.$parent.formatDate(new Date())
      }
    },
    methods: {
    },
    computed: {
      prevDay: function () {
        var prev = new Date(this.currentDay)
        prev.setDate(prev.getDate() - 1)
        return this.$parent.formatDate(prev)
      },
      nextDay: function () {
        var next = new Date(this.currentDay)
        next.setDate(next.getDate() + 1)
        return this.$parent.formatDate(next)
      }
    },
    mounted () {
    },
    beforeRouteEnter (to, from, next) {
      var current = to.params.day
      function fill (num) {
        return num >= 10 ? num : '0' + num
      }
      var currentDay
      if (current === '' || current === 'now') {
        let tmpDate = new Date()
        let year = tmpDate.getFullYear()
        let month = fill(tmpDate.getMonth() + 1)
        let day = fill(tmpDate.getDate())
        currentDay = year + '-' + month + '-' + day
      } else {
        currentDay = current
      }
      next(vm => {
        vm.$data.currentDay = currentDay
      })
    },
    beforeRouteUpdate (to, from, next) {
      var current = to.params.day
      if (current === '' || current === 'now') {
        this.currentDay = this.$parent.formatDate(new Date())
      } else {
        this.currentDay = current
      }
      next()
    }
  }

</script>

<style scoped>
</style>
