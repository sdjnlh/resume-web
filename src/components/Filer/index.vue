<template lang="pug">
  .w-100(style='min-height: 200px;')
    .w-100.text-center.py-2(slot='title')
      el-radio-group(size='mini', v-model='selectedType')
        el-radio-button(v-for='tp in tps' :key='tp.value' :label="tp.value") {{tp.name}} {{tp.count}}
    .w-100.mt-2
      typed-filer(v-for='item in files', v-show='item.type == selectedType', :files='item.files', :key='item.type',
      :type='item.type', :tag='tag', :ownerId='ownerId', :selectable='item.selectable', :editable='item.editable',
      @file-uploaded="handleFileUploaded", @select-file="handleSelectFile", @delete-file='handleDeleteFile')
</template>

<script>
import API from '@/api/api'
import TypedFiler from './typedFiler'
//import FS from '@/utils/fs'

const TAG = 'Filer::'
export default {
  components: { TypedFiler },
  name: 'Filer',
  props: {
    types: {
      type: Array,
      default: function() {
        return [
          {
            value: FS.types.IMAGE,
            name: '图片',
            editable: false,
            selectable: false
          },
          {
            value: FS.types.VIDEO,
            name: '视频',
            editable: false,
            selectable: false
          }
        ]
      }
    },
    ownerId: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedType: FS.types.IMAGE,
      files: [],
      tps: this.types
    }
  },
  watch: {
    ownerId: function(newVal) {
      console.log('owner id changed', newVal)
      if (newVal && newVal > 0) {
        this.$nextTick(this.reloadFiles)
      }
    }
  },
  methods: {
    handleFileUploaded: function(file) {
      this.reloadFiles(file.type)
    },
    handleDeleteFile: function(file) {
      this.reloadFiles(file.type)
    },
    reloadFiles: function(type) {
      var tp = type
      if (!tp) {
        tp = []
        for (var i = 0; i < this.tps.length; i++) {
          tp.push(this.tps[i].value)
        }
      }

      var filter = {}
      filter.oid = this.ownerId || 0
      if (this.ownerId <= 0) {
        console.log('no file owner, will not get files')
        return
      }
      // filter.type = tp
      filter.tag = this.tag

      API.fs
        .filter(filter)
        .then(res => {
          console.log(TAG, 'get files', JSON.stringify(res.data))

          // var keys = Object.keys(res.data.data)
          var files = []
          for (var i = 0; i < this.tps.length; i++) {
            var type = this.tps[i].value
            console.log(TAG, 'file type', type)
            var typedFiles = {
              files: res.data.data[type] || [],
              type: parseInt(type),
              editable: this.tps[i].editable || false,
              selectable: this.tps[i].selectable || false
            }
            this.tps[i].count = typedFiles.files.length || 0
            files.push(typedFiles)
          }
          this.files = files
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleSelectFile(file) {
      console.log(TAG, 'file selected in filer', JSON.stringify(file))
      this.$emit('select-file', file)
    }
  },
  mounted: function() {
    console.log(TAG, 'mounted, ownerId ', this.ownerId)
    var files = []
    for (var i = 0; i < this.tps.length; i++) {
      var type = this.tps[i].value
      console.log(TAG, 'file type', type)
      var typedFiles = {
        files: [],
        type: parseInt(type),
        editable: this.tps[i].editable || false,
        selectable: this.tps[i].selectable || false
      }
      this.tps[i].count = 0
      files.push(typedFiles)
    }
    this.files = files

    this.reloadFiles()
  }
}
</script>

<style scoped></style>
