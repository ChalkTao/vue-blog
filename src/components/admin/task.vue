<template>
  <div class="box box-info">
    <div class="box-body">
      <div class="nav-tabs-custom">
        <!-- Tabs within a box -->
        <ul class="nav nav-tabs pull-right ui-sortable-handle">
          <li class=""><a href="#state-chart" data-toggle="tab" aria-expanded="true" @click="changeTab('state')">日记</a></li>
          <li class=""><a href="#event-chart" data-toggle="tab" aria-expanded="true" @click="changeTab('event')">事件</a></li>
          <li class="active"><a href="#task-chart" data-toggle="tab" aria-expanded="false" @click="changeTab('task')">任务</a></li>
          <li class="pull-left header"><i class="fa fa-tasks"></i>今日任务</li>
          <li class="pull-left header">
            <button type="button" class="btn btn-sm btn-primary btn-custom" v-show="updated"><i class="fa fa-refresh"></i> 更新</button>
          </li>
        </ul>
        <div class="tab-content no-padding">
          <div id="task-chart" class="chart tab-pane active" style="position: relative; min-height: 400px;">
            <draggable :list="tasks" @start="drag=true" @end="drag=false" @change="moveTask" :options="{disabled: isFuture}">
              <div class="todo-list" v-for="(element, index) in tasks">
                <span class="handle">
                        <i class="fa fa-ellipsis-v"></i>
                        <i class="fa fa-ellipsis-v"></i>
                      </span>
                <small class="label" :class="'label-'+getClass(element.category)"> {{element.category}}</small>
                <input type="checkbox" value="" v-model="element.status" @click="finish(index)" :disabled="isFuture">
                <span class="text">{{element.content}}</span>
                <!--<small class="label" :class="'label-'+getClass"><i class="fa fa-clock-o"></i> {{category}}</small>-->
                <div class="tools" v-show="!isFuture && element.category==='日常'">
                  <i class="fa fa-trash-o" @click="deleteItem(index)"></i>
                </div>
              </div>
            </draggable>
            <div class="box-header with-border" v-show="finished.length>0">
              <h3 class="box-title">已完成</h3>
            </div>
            <draggable :list="finished" @start="drag=true" @end="drag=false">
              <div class="todo-list done" v-for="(element, index) in finished">
                <span class="handle">
                        <i class="fa fa-ellipsis-v"></i>
                        <i class="fa fa-ellipsis-v"></i>
                      </span>
                <small class="label" :class="'label-'+getClass(element.category)"> {{element.category}}</small>
                <input type="checkbox" value="" v-model="element.status" @click="unfinish(index)">
                <span class="text">{{element.content}}</span>
                <small class="label label-danger"><i class="fa fa-clock-o"></i> {{element.finishTime | customTime}}</small>
                <!--<div class="tools">-->
                  <!--<i class="fa fa-trash-o"></i>-->
                <!--</div>-->
              </div>
            </draggable>
          </div>

          <div class="chart tab-pane" id="event-chart" style="position: relative; min-height: 400px;">
            <draggable :list="scores" @start="drag=true" @end="drag=false" @change="moveScore">
              <div class="todo-list" v-for="(element, index) in scores">
                <span class="handle">
                        <i class="fa fa-ellipsis-v"></i>
                        <i class="fa fa-ellipsis-v"></i>
                      </span>
                <small class="label" :class="'label-'+getScoreClass(element.score)"> {{element.score}}</small>
                <span class="text">{{element.content}}</span>
                <div class="tools">
                <i class="fa fa-trash-o" @click="deleteScore(index)"></i>
                </div>
              </div>
            </draggable>
          </div>
          <div class="chart tab-pane" id="state-chart" style="position: relative; min-height: 400px;">
            <textarea class="form-control" rows="20" v-model="state" placeholder=""></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="box-footer clearfix no-border">
      <div class="input-group" v-show="tab==='task'">
        <div class="input-group-btn">
          <button type="button" class="btn dropdown-toggle" :class="'btn-'+getClass(category)" data-toggle="dropdown" aria-expanded="false">{{category}}
            <span class="fa fa-caret-down"></span></button>
          <ul class="dropdown-menu">
            <li v-for="item in tab_list"><a @click="setCategory(item)">{{item}}</a></li>
          </ul>
        </div>
        <input class="form-control" v-model="content" placeholder="新建任务">
        <div class="input-group-btn">
          <button type="button" class="btn btn-success" @click="addItem"><i class="fa fa-plus"></i></button>
        </div>
      </div>
      <div class="input-group" v-show="tab==='event'">
        <div class="input-group-btn">
          <button type="button" class="btn dropdown-toggle" :class="'btn-'+getScoreClass(score)" data-toggle="dropdown" aria-expanded="false">{{score}}
            <span class="fa fa-caret-down"></span></button>
          <ul class="dropdown-menu">
            <li v-for="item in score_list"><a @click="setScore(item)">{{item}}</a></li>
          </ul>
        </div>
        <input class="form-control" v-model="score_content" placeholder="新建事件">
        <div class="input-group-btn">
          <button type="button" class="btn" :class="'btn-'+getScoreClass(score)" @click="addScoreItem"><i class="fa fa-plus"></i></button>
        </div>
      </div>
      <button type="button" v-show="tab==='state'" class="pull-right btn btn-sm btn-default" @click="save">保存
        <i class="fa fa-save"></i>
      </button>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    props: ['day'],
    components: {
      draggable
    },
    data () {
      return {
        currentDay: '',
        tab: 'task',
        loading: false,
        updated: false,
        category: '重要',
        content: '',
        tasks: [],
        finished: [],
        scores: [],
        tab_list: ['重要', '一般'],
        score: '+1分',
        score_list: ['+5分', '+3分', '+1分', '-1分', '-3分', '-5分'],
        score_content: '',
        state: ''
      }
    },
    methods: {
      updateTask: function () {
        this.$http.put('task/daily/' + this.currentDay, {
          tasks: this.tasks,
          finished: this.finished
        }).then(response => {
          this.$message.success('成功')
        }, response => {
          var msg = (response.data && response.data.error_msg) || '更新失败'
          this.$message.error(msg)
        })
      },
      updateScore: function () {
        var scores = this.scores.map(item => {
          return {
            content: item.content,
            score: Number(item.score.substr(0, 2))
          }
        })
        this.$http.put('task/score/' + this.currentDay, {
          scores: scores
        }).then(response => {
          this.$message.success('成功')
        }, response => {
          var msg = (response.data && response.data.error_msg) || '更新失败'
          this.$message.error(msg)
        })
      },
      addItem: function () {
        if (this.content === '') {
          return
        }
        this.tasks.push({
          content: this.content,
          category: this.category
        })
        this.content = ''
        this.updateTask()
      },
      setCategory: function (cat) {
        this.category = cat
      },
      getClass: function (category) {
        const color = ['info', 'danger', 'success']
        return color[this.tab_list.indexOf(category) + 1]
      },
      finish: function (index) {
        var item = this.tasks[index]
        this.tasks.splice(index, 1)
        item.finishTime = new Date()
        item.status = true
        this.finished.push(item)
        this.updateTask()
      },
      unfinish: function (index) {
        var item = this.finished[index]
        this.finished.splice(index, 1)
        item.status = false
        this.tasks.push(item)
        this.updateTask()
      },
      deleteItem: function (index) {
        this.tasks.splice(index, 1)
        this.updateTask()
      },
      changeTab: function (tab) {
        this.tab = tab
      },
      getScoreClass: function (event) {
        return event[0] === '+' ? 'danger' : 'success'
      },
      setScore: function (score) {
        this.score = score
      },
      addScoreItem: function () {
        if (this.score_content === '') {
          return
        }
        this.scores.push({
          content: this.score_content,
          score: this.score
        })
        this.score_content = ''
        this.updateScore()
      },
      deleteScore: function (index) {
        this.scores.splice(index, 1)
        this.updateScore()
      },
      moveScore: function () {
        this.updateScore()
      },
      moveTask: function () {
        this.updateTask()
      },
      save: function () {
        this.$http.put('task/state/' + this.currentDay, {
          state: this.state
        }).then(response => {
          this.$message.success('成功')
        }, response => {
          var msg = (response.data && response.data.error_msg) || '更新失败'
          this.$message.error(msg)
        })
      }
    },
    computed: {
      isFuture: function () {
        var time = new Date(this.currentDay).getTime() - new Date().getTime()
        var day = Math.floor(time / (24 * 60 * 60 * 1000))
        return day >= 0
      }
    },
    mounted () {
      this.$watch('day', function () {
        this.currentDay = this.day
        this.$http.get('task/daily/' + this.day).then(response => {
          this.tasks = response.data.data.tasks || []
          var finished = response.data.data.finished || []
          this.finished = finished.map(item => {
            item.status = true
            return item
          })
          var scores = response.data.data.scores || []
          this.scores = scores.map(item => {
            if (item.score > 0) {
              item.score = '+' + item.score + '分'
            } else {
              item.score = item.score + '分'
            }
            return item
          })
          this.state = response.data.data.state
        }, response => {
          var msg = (response.data && response.data.error_msg) || '获取失败'
          this.$message.error(msg)
        })
      })
    }
  }

</script>

<style scoped>
  .nav-tabs-custom {
    margin-bottom: 0;
  }
  .btn-custom {
    margin-left: -11px;
    margin-bottom: 4px;
  }
</style>
