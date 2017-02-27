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
        <markdown-editor v-model="article.content" :configs="configs" ref="markdownEditor"></markdown-editor>
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
          spellChecker: false, // 禁用拼写检查
          renderingConfig: {
            codeSyntaxHighlighting: true, // 开启代码高亮
            highlightingTheme: 'atom-one-light' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
          }
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
              _this.article.content = ''
              if (window.localStorage) {
                window.localStorage.setItem('content', '')
              }
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
      },
      pubt64 (pic, imageFile) {
        const _this = this
        this.$message({
          showClose: true,
          message: '图片上传中'
        })
        var url = 'http://upload.qiniu.com/putb64/' + imageFile.size
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            console.log(xhr.responseText)
            var dataImg = JSON.parse(xhr.responseText)
//            _this.article.content = _this.article.content +
//              '\n![](' + _this.$store.state.domain + dataImg.key + ')'
            var pos = _this.simplemde.codemirror.getCursor()
            _this.simplemde.codemirror.setSelection(pos, pos)
            _this.simplemde.codemirror.replaceSelection('\n![](' + _this.$store.state.domain + dataImg.key + ')')
          }
          _this.$message({
            showClose: true,
            message: '图片上传成功',
            type: 'success'
          })
        }
        xhr.open('POST', url, true)
        xhr.setRequestHeader('Content-Type', 'application/octet-stream')
        xhr.setRequestHeader('Authorization', 'UpToken ' + this.$store.state.uptoken)
        xhr.send(pic)
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
      this.simplemde.codemirror.on('paste', (instance, e) => {
        for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
          if (e.clipboardData.items[i].kind === 'file' && /image\//.test(e.clipboardData.items[i].type)) {
            var imageFile = e.clipboardData.items[i].getAsFile()
            var fileReader = new FileReader()
            fileReader.onloadend = function (e) {
//              console.log(e.target.result)
              _this.pubt64(e.target.result.replace('data:image/png;base64,', ''), imageFile)
            }
            fileReader.readAsDataURL(imageFile)
            e.preventDefault()
            break
          }
        }
      })
      if (window.localStorage && window.localStorage.getItem('content')) {
        console.log(window.localStorage.getItem('content'))
        this.article.content = window.localStorage.getItem('content')
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.article.content && window.localStorage) {
        window.localStorage.setItem('content', this.article.content)
      }
      next()
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
