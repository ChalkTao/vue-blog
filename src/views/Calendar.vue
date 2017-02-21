<template>
  <div class="content-wrapper">
    <full-calendar :events="fcEvents" lang="zh"
                   @dayClick="dayClick" @changeMonth="changeMonth" @eventClick="eventClick">
    </full-calendar>
  </div>
</template>
<script>
  import fullCalendar from 'vue-fullcalendar'
  export default {
    components: {
      'full-calendar': fullCalendar
    },
    data () {
      return {
        fcEvents: [],
        loading: false
      }
    },
    methods: {
      changeMonth (start, end, current) {
        console.log(start, end, current)
        this.$http.get('task/calendar', {
          params: {
            start: start,
            end: end
          }
        }).then(response => {
          this.fcEvents = response.data.data
          this.loading = false
        }, response => {
          var msg = (response.data && response.data.error_msg) || '获取失败'
          this.$message.error(msg)
          this.loading = false
        })
      },
      dayClick (day) {
        this.$router.push({name: 'task', params: {day: this.$parent.formatDate(day)}})
      },
      eventClick (event) {
        console.log(event)
      }
    }
  }
</script>
<style>
  .full-calendar-body .events-day {
    min-height: 98px !important;
  }
  .fail {
    background-color: red !important;
  }
  .success {
    background-color: green !important;
  }
  .important {
    background-color: yellow !important;
  }
</style>
