<template lang="pug">
  .w-100
    .bg-file.w-100.border.df-row-ac-ja.position-relative(style="height:400px;")
      file-render.fill(:file="file", :selectable='selectable', :editable='editable', :deletable='deletable', :front='mode === "view"', @delete-file='handleDeleteFile', @edit-file='handleEdit', @select-file="handleSelectFile")
      .fill.position-absolute(v-if='mode === "edit"')
        file-editor(:file="file", :front='mode === "edit"', @view-file='handleViewFile', @file-uploaded="handFileUploaded")
    .thumbnails.w-100.mt-3.d-flex.flex-row.position-relative
      .block-upload.rounded.mr-2(@click='handleAdd')
        svg-icon.text-secondary(icon-class='plus-thin')
      .flex-1.d-flex.scroll-x(style='height: 60px;')
          img.cover-thumb.mr-2.pointer(v-for='fl, index in files', :key='fl.url', :src='fl | fileCover', @click='handleView(index)', style='float: left;')
</template>

<script>
import FileRender from './render'
import FileEditor from './editor'

export default {
  components: { FileRender, FileEditor },
  name: 'TypedFiler',
  props: {
    files: {
      type: Array,
      default: function() {
        return []
      }
    },
    ownerId: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: 1
    },
    deletable: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mode: 'view',
      file: this.files != null && this.files.length > 0 ? this.files[0] : {}
    }
  },
  computed: {
    hasCover: function() {
      return this.type !== 1
    }
  },
  watch: {
    files: function(newVal) {
      console.log('files changed')
      // if (!this.file.id || this.file.id <= 0) {
      //   this.file = newVal != null && newVal.length > 0 ? newVal[0] : {}
      // }
      this.file = newVal != null && newVal.length > 0 ? newVal[0] : {}
    }
  },
  methods: {
    handleView: function(index) {
      this.mode = 'view'
      this.file = this.files[index]
      console.log('view file', JSON.stringify(this.file))
    },
    handleViewFile: function(file) {
      this.mode = 'view'
      this.file = file
    },
    handFileUploaded: function(file) {
      console.log('file uploaded', JSON.stringify(file))
      this.file = file
      this.mode = 'view'
      this.$emit('file-uploaded', file)
    },
    handleEdit: function() {
      console.log('handle edit')
      this.mode = 'edit'
    },
    handleAdd: function() {
      this.file = { type: this.type, ownerId: this.ownerId, tag: this.tag }
      this.mode = 'edit'
    },
    handleSelectFile: function(file) {
      this.$emit('select-file', file)
    },
    handleDeleteFile: function(file) {
      this.$emit('delete-file', file)
    }
  }
}
</script>

<style scoped>
.thumbnails {
  height: 80px;
}

.thumbnails .block-upload {
  height: 60px;
  width: 60px;
  line-height: 60px;
  font-size: 36px;
  color: #999;
  border: 1px dashed #999;
  text-align: center;
  cursor: pointer;
}
</style>
