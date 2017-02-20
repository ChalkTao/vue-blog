<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        <h3 class="box-title">日常任务</h3>
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" title="" data-original-title="Add"
                  @click="show=!show">
            <i class="fa" :class="{'fa-plus': !show, 'fa-minus': show}"></i></button>
        </div>
      </div>
      <div class="box-body" style="min-height: 100px;">
        <draggable :list="schedule" @start="drag=true" @end="drag=false" @change="moveTask">
          <div class="todo-list" v-for="(element, index) in schedule" :class="{'done': !element.status}">
              <small class="label" :class="'label-'+getClass(element.type)"> {{element.type}}</small>
              <span class="text">{{element.content}}</span>
              <!--<small class="label" :class="'label-'+getClass"><i class="fa fa-clock-o"></i> {{category}}</small>-->
              <div class="tools">
                <i class="fa fa-trash-o" @click="deleteSchedule(index)"></i>
              </div>
          </div>
        </draggable>
      </div>

      <div class="box-footer clearfix no-border" v-show="show">
        <div class="input-group">
          <div class="input-group-btn">
            <button type="button" class="btn dropdown-toggle" :class="'btn-'+getClass(type)" data-toggle="dropdown" aria-expanded="false">{{type}}
              <span class="fa fa-caret-down"></span></button>
            <ul class="dropdown-menu">
              <li v-for="item in schedule_list"><a @click="setType(item)">{{item}}</a></li>
            </ul>
          </div>
          <input class="form-control" v-model="content" placeholder="新建日常任务">
          <div class="input-group-btn">
            <button type="button" class="btn" :class="'btn-'+getClass(type)" @click="addSchedule"><i class="fa fa-plus"></i></button>
          </div>
        </div>
      </div>
    </div>
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
        currentDay: '',
        schedule: [],
        type: '每天',
        content: '',
        schedule_list: ['每天', '工作日', '周末'],
        show: false
      }
    },
    methods: {
      getClass: function (type) {
        const style = ['info', 'success', 'warning']
        return style[this.schedule_list.indexOf(type)]
      },
      moveTask: function () {

      },
      setType: function (type) {
        this.type = type
      },
      addSchedule: function () {
        if (this.content === '') {
          return
        }
        this.$http.post('task/schedule/' + this.currentDay, {
          type: this.type,
          content: this.content
        }).then(response => {
          console.log(response.data.data)
          this.schedule.push(response.data.data)
          this.sort()
        }, response => {
          var msg = response.data.error_msg || '添加失败'
          this.$message.error(msg)
        })
      },
      deleteSchedule: function (index) {
        this.$confirm('终止这个任务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var item = this.schedule[index]
          this.$http.put('task/schedule/' + item._id).then(response => {
            this.schedule.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }, response => {
            var msg = response.data.error_msg || '删除失败'
            this.$message.error(msg)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      sort: function () {
        this.schedule.sort((o1, o2) => {
          return o2.status - o1.status || this.schedule_list.indexOf(o2.type) - this.schedule_list.indexOf(o1.type)
        })
      }
    },
    computed: {
    },
    mounted () {
      var current = this.$route.params.day
      if (current === '' || current === 'now') {
        this.currentDay = this.$parent.$parent.formatDate(new Date())
      } else {
        this.currentDay = current
      }
      this.$http.get('task/schedule/' + this.currentDay).then(response => {
        this.schedule = response.data.data
        this.sort()
      }, response => {
        var msg = response.data.error_msg || '获取失败'
        this.$message.error(msg)
      })
    }
  }

</script>

<style scoped>
</style>
