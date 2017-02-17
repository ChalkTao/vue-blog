<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>我的任务</h1>
    </section>

    <section class="content" v-loading="loading">
      <div class="row">
        <section class="col-lg-6">
          <div class="nav-tabs-custom">
            <!-- Tabs within a box -->
            <ul class="nav nav-tabs pull-right ui-sortable-handle">
              <li class=""><a href="#revenue-chart" data-toggle="tab" aria-expanded="false">Area</a></li>
              <li class="active"><a href="#sales-chart" data-toggle="tab" aria-expanded="true">Donut</a></li>
              <li class="pull-left header"><i class="fa fa-inbox"></i> Sales</li>
            </ul>
            <div class="tab-content no-padding">
              <div id="revenue-chart" class="chart tab-pane">
                <draggable :list="list" :options="{group:'people'}" @start="drag=true" @end="drag=false">
                  <div class="todo-list" v-for="element in list">
                      <!-- drag handle -->
                      <span class="handle">
                        <i class="fa fa-ellipsis-v"></i>
                        <i class="fa fa-ellipsis-v"></i>
                      </span>
                      <!-- checkbox -->
                      <input type="checkbox" value="">
                      <!-- todo text -->
                      <span class="text">Design a nice theme</span>
                      <small class="label label-danger"><i class="fa fa-clock-o"></i> 2 mins</small>
                      <div class="tools">
                        <i class="fa fa-edit"></i>
                        <i class="fa fa-trash-o"></i>
                      </div>
                  </div>
                </draggable>
              </div>

              <div class="chart tab-pane active" id="sales-chart" style="position: relative; height: 300px;"><svg height="300" version="1.1" width="572" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative;"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.1.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><path fill="none" stroke="#3c8dbc" d="M286,243.33333333333331A93.33333333333333,93.33333333333333,0,0,0,374.2277551949771,180.44625304313007" stroke-width="2" opacity="0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></path><path fill="#3c8dbc" stroke="#ffffff" d="M286,246.33333333333331A96.33333333333333,96.33333333333333,0,0,0,377.06364732624417,181.4248826052307L413.6151459070204,194.03833029452744A135,135,0,0,1,286,285Z" stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><path fill="none" stroke="#f56954" d="M374.2277551949771,180.44625304313007A93.33333333333333,93.33333333333333,0,0,0,202.28484627831412,108.73398312817662" stroke-width="2" opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;"></path><path fill="#f56954" stroke="#ffffff" d="M377.06364732624417,181.4248826052307A96.33333333333333,96.33333333333333,0,0,0,199.59400205154566,107.40757544301087L160.42726941747117,88.10097469226493A140,140,0,0,1,418.3416327924656,195.6693795646951Z" stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><path fill="none" stroke="#00a65a" d="M202.28484627831412,108.73398312817662A93.33333333333333,93.33333333333333,0,0,0,285.97067846904883,243.333328727518" stroke-width="2" opacity="0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></path><path fill="#00a65a" stroke="#ffffff" d="M199.59400205154566,107.40757544301087A96.33333333333333,96.33333333333333,0,0,0,285.96973599126824,246.3333285794739L285.9575884998742,284.9999933380171A135,135,0,0,1,164.9120097954186,90.31165416754118Z" stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="286" y="140" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" font-size="15px" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: 800; font-stretch: normal; font-size: 15px; line-height: normal; font-family: Arial;" font-weight="800" transform="matrix(1.6795,0,0,1.6795,-194.3193,-100.7322)" stroke-width="0.5954241071428572"><tspan dy="5.25" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">In-Store Sales</tspan></text><text x="286" y="160" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" font-size="14px" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 14px; line-height: normal; font-family: Arial;" transform="matrix(2.0072,0,0,2.0072,-288.0344,-153.3414)" stroke-width="0.4982142857142858"><tspan dy="4.75" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">30</tspan></text></svg></div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    components: {
      draggable
    },
    data () {
      return {
        loading: false,
        list: [{
          name: '123',
          order: 1,
          fixed: false
        }, {
          name: '2',
          order: 2,
          fixed: false
        }, {
          name: '3',
          order: 3,
          fixed: false
        }, {
          name: '4',
          order: 4,
          fixed: false
        }, {
          name: '5',
          order: 5,
          fixed: false
        }]
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
