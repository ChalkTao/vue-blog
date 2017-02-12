<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        General Form Elements
        <small>Preview</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Forms</a></li>
        <li class="active">General Elements</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
    </section>
  </div>
</template>

<script>
  import { markdownEditor } from 'vue-simplemde'

  // 基础用法
  export default {
    components: {
      markdownEditor
    },
    data () {
      return {
        content: '',
        configs: {
          spellChecker: false // 禁用拼写检查
        }
      }
    },
    computed: {
      simplemde () {
        return this.$refs.markdownEditor.simplemde
      }
    },
    mounted () {
      this.simplemde.codemirror.on('optionChange', (instance, changeObj) => {
        console.log(changeObj)
        if (changeObj === 'fullScreen') {
          this.$parent.fullScreen(this.simplemde.isFullscreenActive())
        }
      })
    }
  }

</script>
