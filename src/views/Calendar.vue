<template>
  <div class="content-wrapper">
    <full-calendar :events="fcEvents" lang="zh"
                   @dayClick="dayClick" @changeMonth="changeMonth" @eventClick="eventClick">
    </full-calendar>
  </div>
</template>
<script>
  import fullCalendar from 'vue-fullcalendar'
  var demoEvents = [
    {
      title: 'Sunny Out of Office',
      start: '2016-08-25',
      end: '2017-07-27'
    },
    {
      title: 'Sunny Out of Office',
      start: '2017-02-16',
      end: '2017-02-18'
    },
    {
      title: 'Sunny Out of Office',
      start: '2017-02-16',
      end: '2017-02-18'
    },
    {
      title: 'Sunny Out of Office',
      start: '2017-02-16',
      end: '2017-02-18'
    },
    {
      title: 'Sunny Out of Office',
      start: '2017-02-16',
      end: '2017-02-18'
    },
    {
      title: 'Sunny Out of Office',
      start: '2017-02-16',
      end: '2017-02-18'
    }
  ]
  export default {
    components: {
      'full-calendar': fullCalendar
    },
    data () {
      return {
        fcEvents: demoEvents
      }
    },
    methods: {
      changeMonth (start, end, current) {
        console.log(start, end, current)
      },
      dayClick (day) {
        console.log(this.$parent.formatDate(day))
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
</style>
