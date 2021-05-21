<template lang="pug">
  .w-100
    .w-100.df-col-ac
      el-upload.df-row-ac-js.text-muted(drag, :multiple="multi", :action='action', :data='extra', :file-list='files', :show-file-list="true" :with-credentials='true' :on-success="handleSuccess", :auto-upload="false", ref="upload")
        i.el-icon-upload(style='font-size: 40px;')
        .el-upload__text
          span Drag and drop files here, or
          em.ml-2 click to upload
          p.ml-2 Multiple files supported.

    //.w-100.h-60p.df-row-ac.mt-3
      .label.label-lg Selected tags:
      el-tag(v-for="tag in selectedTags", :key="tag", type="success" , closable,  @close="handleClose(tag)") {{tag}}
      el-input.input-new-tag.ml-2( v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm")
      el-button.button-new-tag.ml-2(v-else size="small" @click="showInput") + New Tag
    //.w-100.h-60p.df-row-ac
      .label.label-lg Candidate tags:
      el-tag.pointer(v-for="tag in candidateTags", :key="tag", @click.native="selectTag(tag)") {{tag}}
    .w-100.mt-4.py-3.text-center.border-top
      el-button(type='primary', @click="submitUpload") Upload
</template>

<script>
import _ from 'lodash'
import API from '@/api/api'

export default {
  name: 'FileUploader',
  props: {
    tags: {
      type: Array,
      default: function() {}
    },
    multi: {
      type: Boolean,
      default: true
    },
    file: {
      type: Object,
      default: function() {
        return { tags: [] }
      }
    },
    action: {
      type: String,
      default: process.env.VUE_APP_API_BASE + 'v1/files'
    }
  },
  watch: {
    file: function() {
      this.selectedTags = []
      this.files = []
    }
  },
  computed: {
    hasSelectedTags: function() {
      return this.selectedTags != null && this.selectedTags.length > 0
    },
    extra: function() {
      var model = _.clone(this.file)
      model.tags = this.selectedTags
      return model
    }
  },
  data() {
    return {
      domain: {},
      selectedTags: [],
      candidateTags: [],
      files: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    selectTag: function(tag) {
      if (this.selectedTags.indexOf(tag) == -1) {
        this.selectedTags.push(tag)
      }
    },
    handleClose(tag) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1)
      console.log('1', this.selectedTags)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.selectTag(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    uploadImages: function(item) {
      const formData = new FormData()
      if (this.domain.id) {
        formData.append('id', this.domain.id)
      }
      if (this.domain.type) {
        formData.append('type', this.domain.type)
      }
      // formData.append('tag', _.join(this.selectedTags, ','))
      if (this.domain.ownerId) {
        formData.append('ownerId', this.domain.ownerId)
      }
      formData.append('file', item.file)
      API.fs
        .upload(formData)
        .then(res => {
          let time = new Date().getTime()
          if (time > this.notifyTime + 5000) {
            this.notifyTime = time
            this.$emit('file-uploaded', res.data)
          }
        })
        .catch(() => {
          this.$message.error(
            'Fail to upload ' + item.file.name + ', please try again later'
          )
        })
    },
    handleSuccess: function(res, file, fileList) {
      console.log('upload file success', file, fileList)
      let finished = true
      for (let i = 0; i < fileList.length; i++) {
        if (!fileList[i].response || !fileList[i].response.ok) {
          finished = false
        }
      }

      if (finished) {
        this.$emit('file-uploaded', res.data)
      }
    }
  },
  mounted: function() {}
}
</script>
<style scoped>
.el-upload-list {
  margin-left: 20px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
