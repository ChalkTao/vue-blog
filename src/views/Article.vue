<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        新建文章
      </h1>
    </section>

    <section class="content" v-loading="loading">
      <div class="row">
        <el-form ref="article" :model="article" :rules="rules" label-width="90px">
        <div class="col-md-7">
          <div class="box box-primary">
              <div class="box-body">
                  <el-form-item label="文章题目" prop="title">
                    <el-input v-model="article.title"></el-input>
                  </el-form-item>
                  <el-form-item label="文章标签">
                    <el-select v-model="article.labels" multiple filterable allow-create
                               placeholder="请选择文章标签">
                      <el-option v-for="item in labels" :label="item" :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="box box-primary">
              <div class="box-body">
                  <el-form-item label="文章分类" prop="category">
                    <el-select v-model="article.category" placeholder="请选择" @change="handleChange">
                      <el-option v-for="item in categories" :label="item" :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="同时发布">
                    <el-col :span="8">
                      <el-switch on-text="" off-text="" v-model="article.publish"></el-switch>
                    </el-col>
                    <div class="pull-right">
                      <button type="submit" class="btn btn-primary" @click.prevent="onSubmit('article')">保存</button>
                      <button class="btn btn-default" @click="onCancel">取消</button>
                    </div>
                  </el-form-item>
              </div>
            </div>
        </div>
        </el-form>
      </div>

      <div>
        <markdown-editor v-model="article.content" ref="markdownEditor"></markdown-editor>
      </div>

    </section>
  </div>
</template>

<script>
  import {markdownEditor} from 'vue-simplemde'

  export default {
    components: {
      markdownEditor
    },
    data () {
      return {
        article: {
          _id: '',
          title: '',
          content: '',
          category: '',
          publish: false,
          labels: []
        },
        rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ]
        },
        configs: {
          spellChecker: false // 禁用拼写检查
        },
        loading: false,
        labels: [],
        categories: [],
        categoryInfo: {}
      }
    },
    methods: {
      onSubmit (formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$http.put('article/' + _this.article._id, _this.article).then(response => {
              window.console.log(response.data)
              _this.$message.success('成功')
              _this.$router.push({name: 'articles'})
            }, response => {
              var msg = (response.data && response.data.error_msg) || '创建失败'
              _this.$message.error(msg)
              _this.loading = false
            })
          } else {
            _this.$message.error('保存错误')
            return false
          }
        })
      },
      onCancel () {
        this.$router.push({name: 'articles'})
      },
      handleChange (value) {
        console.log(value)
        const _this = this
        if (value === '新建分类') {
          this.$prompt('分类名称', '创建分类', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            _this.categories.splice(0, 0, value)
            _this.article.category = value
          }).catch(() => {
            _this.article.category = ''
          })
          _this.labels = []
        } else if (_this.categoryInfo[value]) {
          _this.labels = _this.categoryInfo[_this.article.category].labels
        } else {
          _this.labels = []
        }
      }
    },
    computed: {
      simplemde () {
        return this.$refs.markdownEditor.simplemde
      }
    },
    mounted () {
      const _this = this
      const uid = this.$store.state.user._id
      this.$http.get('article/' + this.$route.params.aid).then(response => {
        var article = response.data.data
        Object.assign(_this.article, article)
      }, response => {
        var msg = (response.data && response.data.error_msg) || '创建失败'
        this.$message.error(msg)
        this.loading = false
      })
      this.$http.get('article/category/' + uid).then(response => {
        var categoryInfo = response.data.data
        categoryInfo.forEach(item => {
          _this.categoryInfo[item.category] = item
        })
        _this.categories = categoryInfo.map(item => {
          return item.category
        })
        _this.categories.push('新建分类')
      }, response => {
        var msg = (response.data && response.data.error_msg) || '获取分类失败'
        this.$message.error(msg)
      })
      this.simplemde.codemirror.on('optionChange', (instance, changeObj) => {
        console.log(changeObj)
        if (changeObj === 'fullScreen') {
          this.$parent.fullScreen(this.simplemde.isFullscreenActive())
        }
      })
    }
  }

</script>

<style scoped>
  .el-form-item {
    margin-bottom: 18px;
  }
  .el-select {
    width: 100%;
  }
</style>
