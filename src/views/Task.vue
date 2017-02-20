<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>我的任务
      <small>{{currentDay}}</small>
      </h1>
    </section>

    <section class="content" v-loading="loading">
      <div class="row">
        <section class="col-lg-6">
          <Task></Task>
        </section>
        <section class="col-lg-6">
          <Goal></Goal>
          <Schedule></Schedule>
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
        currentDay: ''
      }
    },
    methods: {
    },
    computed: {
    },
    mounted () {
    }
  }

</script>

<style scoped>
</style>
