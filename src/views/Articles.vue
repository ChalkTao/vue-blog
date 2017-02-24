<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        文章列表
      </h1>
    </section>

    <section class="content" v-loading="loading">
      <div class="box box-primary">
        <div class="box-body">
          <el-form :inline="true" :model="options" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="options.title" placeholder="题目关键词"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="options.category" placeholder="文章分类" @change="handleChange">
                  <el-option v-for="item in categories" :label="item" :value="item">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="options.label" placeholder="文章标签">
                <el-option v-for="item in labels" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>

              <el-select v-model="options.publish" placeholder="状态">
                <el-option label="全部文章" value="null"></el-option>
                <el-option label="已发布" value="true"></el-option>
                <el-option label="草稿箱" value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="box box-primary" v-loading="loading">
        <div class="box-body">
          <div class="alert alert-default" v-show="articles.length==0">
            <p>无记录!</p>
          </div>
          <table class="table table-bordered" v-show="articles.length>0">
            <tbody>
            <tr>
              <th style="width: 12px" class="hidden-xs">时间</th>
              <th class="table-title">标题</th>
              <th class="table-category">分类</th>
              <th class="hidden-xs">标签</th>
              <th style="width: 30px" class="hidden-xs">状态</th>
              <th style="width: 100px">操作</th>
            </tr>
            <tr v-for="(item, index) in articles">
              <td class="hidden-xs">{{item.created | formatDate}}</td>
              <td>{{item.title}}</td>
              <td>{{item.category}}</td>
              <td class="hidden-xs"><span v-for="label in item.labels" class="label label-success"
                        style="margin-right: 4px;">{{label}}</span></td>
              <td class="hidden-xs"><button class="btn btn-xs" :class="item.publish? 'btn-success' : 'btn-info'">
                {{item.publish? '发布':'草稿'}}
              </button></td>
              <td>
                <button type="button" class="btn btn-default btn-xs">
                  <router-link :to="{name: 'article', params: {aid: item._id}}">修改</router-link></button>
                <button type="button" class="btn btn-danger btn-xs" @click="deleteArticle(item)">删除</button>
              </td>
            </tr>
            </tbody>
          </table>

          <div class="box-footer clearfix">
            <el-pagination class="pull-right"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[10, 20, 50]"
                           :page-size="options.limit"
                           :layout="layout"
                           :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  // 基础用法
  export default {
    components: {},
    data () {
      return {
        articles: [],
        loading: false,
        total: 0,
        currentPage: 1,
        options: {
          title: null,
          category: null,
          label: null,
          publish: null,
          limit: 10
        },
        labels: [],
        categories: [],
        categoryInfo: {},
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    },
    methods: {
      getArticle () {
        const _this = this
        const uid = this.$store.state.user._id
        this.loading = true
        this.$http.get('article/user/' + uid, {
          params: {
            title: _this.options.title,
            category: _this.options.category,
            label: _this.options.label,
            publish: _this.options.publish,
            page: _this.currentPage,
            limit: _this.options.limit
          }
        }).then(response => {
          _this.articles = response.data.data
          _this.total = response.data.count
          this.loading = false
        }, response => {
          var msg = (response.data && response.data.error_msg) || '获取失败'
          this.$message.error(msg)
          this.loading = false
        })
      },
      search () {
        this.currentPage = 1
        this.getArticle()
      },
      reset () {
        this.options.title = ''
        this.options.category = null
        this.options.label = null
        this.options.publish = null
        this.currentPage = 1
        this.getArticle()
      },
      handleSizeChange (val) {
        this.options.limit = val
        this.currentPage = 1
        this.getArticle()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getArticle()
      },
      handleChange (value) {
        if (this.categoryInfo[value]) {
          this.labels = this.categoryInfo[value].labels
        } else {
          this.labels = []
        }
      },
      deleteArticle (article) {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('article/' + article._id)
          this.articles = this.articles.filter((item) => {
            return item._id !== article._id
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    mounted () {
      if (screen.width < 500) {
        this.layout = 'total, prev, pager, next'
      }
      this.getArticle()
      const _this = this
      const uid = this.$store.state.user._id
      this.$http.get('article/category/' + uid).then(response => {
        var categoryInfo = response.data.data
        categoryInfo.forEach(item => {
          _this.categoryInfo[item.category] = item
        })
        _this.categories = categoryInfo.map(item => {
          return item.category
        })
      }, response => {
        var msg = (response.data && response.data.error_msg) || '获取分类失败'
        this.$message.error(msg)
      })
    }
  }

</script>

<style scoped>
  thead {
    color: #1f2d3d;
    background-color: #eef1f6 !important;
  }
  .table-title {
    width: 260px;
  }
  .table-category {
    width: 100px;
  }
  @media screen and (max-width: 500px) {
    .table-title {
      width: 100px;
    }
    .table-category {
      width: 60px;
    }
  }
</style>
