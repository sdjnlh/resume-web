<template lang="pug">
  .bg-file.w-100.border.text-center.position-relative
    .delete-fab(v-show='deletable && front && domain.id != null && domain.id !== ""')
      el-button(@click='handleDelete' type='danger' size='mini' icon="el-icon-delete" circle)
    .fab(v-show='editable && front && domain.id != null && domain.id !== ""')
      el-button(@click='handleEdit' size='mini' icon="el-icon-upload" circle)
    .fab(v-show='selectable && front && domain.id != null && domain.id !== ""' :style='{top: checkerPosition}')
      el-button(@click='handleSelect', size='mini', type='success' icon="el-icon-check" circle :plain="selectedFileId != file.id")
    .w-100.position-absolute.bg-gray-op.text-white.d-flex.flex-row.align-items-center.justify-content-between(style='left: 0; bottom: 0px; height: 40px;')
      .span.position-absolute(style='right: 5px; bottom:5px;') {{domain.name}}
      .span.position-absolute(style='left: 5px; bottom:5px;') 编号: {{domain.no}}
    img.h-100(v-if='domain.type === 1' ref='image', style='width: auto;', :src='domain.url | fsu')
    video.h-100.w-100(v-if='domain.type === 2', ref='video', :src='domain.url | fsu', controls="controls")

    el-dialog
</template>

<script>
import API from '@/api/api'

export default {
  name: 'FileRender',
  props: {
    file: {
      type: Object,
      required: true
    },
    deletable: {
      type: Boolean,
      default: true
    },
    editable: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    front: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      domain: {},
      selectedFileId: 0,
      stlWidth: 500,
      stlHeight: 400
    }
  },
  computed: {
    checkerPosition: function() {
      return this.editable ? '55px' : '10px'
    }
  },
  watch: {
    file: function(newVal) {
      var domain = Object.assign({}, this.file)

      if (domain.url != null && domain.url !== '') {
        console.log('file url: ', domain.url)
        // domain.rurl = domain.url + '?' + new Date().getTime()
      }

      this.domain = domain
      // this.file = newVal != null && newVal.length > 0 ? newVal[0] : {}
    }
  },
  methods: {
    handleDelete: function() {
      this.$confirm('确认删除该文件吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          API.fs.delete(this.domain.id).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.$emit('delete-file', this.file)
          })
        })
        .catch(() => {
          console.log('删除失败')
          this.$message.error('删除失败')
        })
    },
    handleEdit: function() {
      console.log('edit clicked in render')
      this.$emit('edit-file', this.file)
    },
    handleSelect: function() {
      this.selectedFileId = this.file.id
      this.$emit('select-file', this.file)
    }
  },
  mounted: function() {
    this.domain = Object.assign({}, this.file)
  }
}
</script>

<style scoped>
.delete-fab {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1;
}
</style>
