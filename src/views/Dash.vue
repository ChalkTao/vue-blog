<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        Dashboard
        <small>{{start}} - {{end}}</small>
      </h1>
    </section>
    <section class="content" v-loading="loading">
      <div class="row">
        <section class="col-lg-7">
          <div class="box box-danger">
            <div class="box-header with-border">
              <h3 class="box-title">近一月任务完成率</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <div class="box-body">
              <area-chart
                id="task-area" :data="taskLine" xkey="date" ykeys='[ "finish", "total" ]' resize="true"
                labels='[ "完成任务", "总任务" ]' line-colors='[ "#FF6384", "#36A2EB" ]'
                grid="true" grid-text-weight="bold">
              </area-chart>
            </div>
          </div>
          <div class="box box-success">
            <div class="box-header with-border">
              <h3 class="box-title">近一月任务加减分</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <div class="box-body">
              <line-chart
                id="line" :data="scoreLine" xkey="date" ykeys='[ "score" ]' resize="true"
                labels='[ "得分" ]' line-colors='[ "#FF6384", "#36A2EB" ]'
                grid="true" grid-text-weight="bold">
              </line-chart>
            </div>
          </div>
        </section>
        <section class="col-lg-5">
          <div class="box box-danger">
            <div class="box-header with-border">
              <h3 class="box-title">近一月任务完成率</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <div class="box-body">
              <donut-chart id="task-donut" :data="taskDonut" colors='[ "red", "green" ]' resize="true"></donut-chart>
            </div>
          </div>
          <div class="box box-success">
            <div class="box-header with-border">
              <h3 class="box-title">近一月任务加减分</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <div class="box-body">
              <donut-chart id="score-donut" :data="scoreDonut" colors='[ "red", "green" ]' resize="true"></donut-chart>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>
<script>
  import Raphael from 'raphael/raphael'
  global.Raphael = Raphael
  import { DonutChart, BarChart, LineChart, AreaChart } from 'vue-morris'

  export default {
    data () {
      return {
        loading: false,
        start: '',
        end: '',
        taskDonut: [
          { label: '未完成', value: 1 },
          { label: '已完成', value: 1 }
        ],
        scoreDonut: [
          { label: '扣分', value: 1 },
          { label: '加分', value: 1 }
        ],
        taskLine: [
          { date: '2017-01-01', finish: 0, total: 0 }
        ],
        scoreLine: [
          { date: '2017-01-01', score: 0 }
        ]
      }
    },
    components: {
      DonutChart, BarChart, LineChart, AreaChart
    },
    methods: {
      format: function (date) {
        let year = date.getFullYear()
        let month = this.fill(date.getMonth() + 1)
        let day = this.fill(date.getDate())
        return year + '-' + month + '-' + day
      },
      fill: function (num) {
        return num >= 10 ? num : '0' + num
      }
    },
    mounted () {
      this.loading = true
      let date = new Date()
      this.end = this.format(date)
      date.setDate(date.getDate() - 30)
      this.start = this.format(date)
      this.$http.get('task/chart', {
        params: {
          start: this.start,
          end: this.end
        }
      }).then(response => {
        this.taskDonut = response.data.taskDonut
        this.scoreDonut = response.data.scoreDonut
        this.taskLine = response.data.taskLine
        this.scoreLine = response.data.scoreLine
        this.loading = false
      }, response => {
        var msg = (response.data && response.data.error_msg) || '获取失败'
        this.$message.error(msg)
        this.loading = false
      })
    }
  }
</script>
