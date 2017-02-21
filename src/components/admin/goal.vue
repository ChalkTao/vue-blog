<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        <h3 class="box-title">目标</h3>
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" title="" data-original-title="Add"
          @click="show=!show">
            <i class="fa" :class="{'fa-plus': !show, 'fa-minus': show}"></i></button>
        </div>
      </div>
      <div class="box-body" style="min-height: 100px;">
        <draggable :list="goal" @start="drag=true" @end="drag=false" @change="moveGoal">
          <div class="todo-list" :class="{'done': element.status}" v-for="(element, index) in goal">
              <small class="label" :class="'label-'+getClass(element.type)"> {{element.type}}</small>
              <input type="checkbox" value="" v-model="element.status" @click="finish(element)">
              <span class="text">{{element.content}}</span>
              <small class="label" :class="'label-'+getClass(element.type)"><i class="fa fa-clock-o"></i> {{element.left + '天'}}</small>
              <div class="tools" v-show="!element.status">
                <i class="fa fa-trash-o" @click="deleteGoal(index)"></i>
              </div>
          </div>
        </draggable>
      </div>

      <div class="box-footer clearfix no-border" v-show="show">
        <div class="input-group">
          <div class="input-group-btn">
            <button type="button" class="btn dropdown-toggle" :class="'btn-'+getClass(type)" data-toggle="dropdown"
                    aria-expanded="false">{{type}}
              <span class="fa fa-caret-down"></span></button>
            <ul class="dropdown-menu">
              <li v-for="item in goal_list"><a @click="setType(item)">{{item}}</a></li>
            </ul>
          </div>
          <input class="form-control" v-model="content" placeholder="创建目标">
          <div class="input-group-btn">
            <button type="button" class="btn" :class="'btn-'+getClass(type)" @click="addGoal"><i class="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
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
        goal: [],
        type: '年目标',
        content: '',
        goal_list: ['年目标', '月目标', '周目标'],
        show: false
      }
    },
    methods: {
      getClass: function (type) {
        const style = ['info', 'success', 'warning']
        return style[this.goal_list.indexOf(type)]
      },
      setType: function (type) {
        this.type = type
      },
      addGoal: function () {
        if (this.content === '') {
          return
        }
        this.$http.post('goal/' + this.currentDay, {
          type: this.type,
          content: this.content
        }).then(response => {
          console.log(response.data.data)
          this.goal.push(response.data.data)
          this.sort()
        }, response => {
          var msg = (response.data && response.data.error_msg) || '添加失败'
          this.$message.error(msg)
        })
      },
      finish: function (item) {
        item.status = !item.status
        this.$http.put('goal/' + item._id, {
          status: !item.status
        }).then(response => {
          item.status = !item.status
          this.sort()
        }, response => {
          var msg = (response.data && response.data.error_msg) || '更新失败'
          this.$message.error(msg)
        })
      },
      deleteGoal: function (index) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var item = this.goal[index]
          this.$http.delete('goal/' + item._id).then(response => {
            this.goal.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }, response => {
            var msg = (response.data && response.data.error_msg) || '删除失败'
            this.$message.error(msg)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      moveGoal: function () {
      },
      sort: function () {
        this.goal.sort((o1, o2) => {
          return o1.status - o2.status || this.goal_list.indexOf(o2.type) - this.goal_list.indexOf(o1.type)
        })
      }
    },
    computed: {},
    mounted () {
      this.$watch('day', function () {
        this.currentDay = this.day
        this.$http.get('goal/' + this.currentDay).then(response => {
          this.goal = response.data.data
          this.sort()
        }, response => {
          var msg = (response.data && response.data.error_msg) || '获取失败'
          this.$message.error(msg)
        })
      })
    }
  }
</script>

<style scoped>
</style>
