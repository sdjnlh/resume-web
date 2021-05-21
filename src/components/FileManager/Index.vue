<template lang="pug">
  .components-container
    .panel.bg-white
      .w-100.df-row-ac-jb.border-bottom.py-3
        el-breadcrumb.app-breadcrumb
          el-breadcrumb-item
            span.pointer(@click="handleReturnFirst") Root
          el-breadcrumb-item(v-for="item in folders" :key="item.id")
            span.pointer(@click="handleReturnFolder(item)") {{item.name}}
        .pr-3
          el-button.mr-3(type="info" plain size='mini' @click="prev") Back
          el-button.mr-3(icon='el-icon-plus' type="primary" size="mini" plain @click="showCreateFolderForm") Create Folder
          el-button(icon='el-icon-upload' type="primary" size="mini" @click="handleUpload") Upload
      .df-row-asa.flex-wrap.p-3.mh-400p
        template(v-for="file in files")
          a(v-if='file.type !== "dir"' :href="file | fileName" target='_blank' :key='file.id')
            .df-col-ac.pointer.p-2(@contextmenu.prevent="$refs.menu.open($event, file)")
              svg-icon.dir.m-3(:icon-class='file | fileIcon')
              .pf-caption {{file.name}}
          .df-col-ac.pointer.p-2(v-else @click="handleClickFile(file)"  @contextmenu.prevent="$refs.menu.open($event, file)" :key='file.id')
            svg-icon.dir.m-3(:icon-class='file | fileIcon')
            .pf-caption {{file.name}}

    el-dialog(title="Create Folder" width='500px' :visible.sync='folderDialogVisible')
      el-form(:model='folder' label-width='100px')
        el-form-item(prop='name' label='Name')
          el-input(v-model="folder.name")
      .dialog-footer.text-center(slot='footer')
        el-button(@click='folderDialogVisible = false') Cancel
        el-button(type='primary', @click='handleSaveFolder') Save
    el-dialog(title="Rename Folder" width='500px' :visible.sync='RenameFolderDialogVisible')
      el-form(:model='folder' label-width='100px')
        el-form-item(prop='name' label='Name')
          el-input(v-model="rename")
      .dialog-footer.text-center(slot='footer')
        el-button(@click='RenameFolderDialogVisible = false') Cancel
        el-button(type='primary', @click='handleRenameFolder') Save

    el-dialog(title="upload file" :visible.sync='dialogVisible' center)
      file-uploader(:file="file" @file-uploaded="handleFileUploaded")

    vue-context(ref="menu")
      ul(slot-scope="child")
        li(@click="onClickMenu($event.target, child.data,renameFile)")
          .w-100(data-action='rename')
            svg-icon.fs-18.mr-2(icon-class='edit')
            span(@click="showRenameFolderDialogVisible").pf-subhead.pointer Rename
        li(@click="onClickMenu($event.target, child.data,downloadFile)")
          .w-100(data-action='download')
            svg-icon.fs-18.mr-2(icon-class='download')
            span.pf-subhead.pointer Download
        li(@click="onClickMenu($event.target, child.data,deleteFile)")
          .w-100(data-action='delete')
            svg-icon.fs-18.mr-2.text-danger(icon-class='delete')
            span.pf-subhead.pointer Delete

</template>

<script>
import _ from 'lodash'
import FileUploader from './FileUploader'
import { VueContext } from 'vue-context'
import API from '@/api/api'

export default {
  name: 'FileManager',
  components: {
    FileUploader,
    VueContext
  },
  props: {
    ownerId: {
      type: String,
      default: ''
    },
    filter: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      fsRoot: process.env.VUE_APP_FS_BASE,
      folderDialogVisible: false,
      RenameFolderDialogVisible: false,
      dialogVisible: false,
      inputVisible: false,
      inputValue: '',
      // files: [],
      folder: {},
      path: ['root'],
      file: { ownerId: this.ownerId, parentId: this.parentId },
      editingFile: {},
      files: [],
      folders: [],
      fileDetail: {},
      renameFile: 'rename',
      downloadFile: 'downFile',
      deleteFile: 'delete',
      rename: '',
      parentId: '0'
    }
  },
  watch: {
    selectedTags: function() {
      _.debounce(this.loadData(), 500)
    }
  },
  methods: {
    handleReturnFirst: function() {
      this.folders = []
      let filter = _.clone(this.filter)
      filter.oid = this.ownerId
      filter.parentid = ''
      API.fs
        .filter(filter)
        .then(res => {
          this.files = res.data.data
        })
        .catch(() => {
          this.$message.warning('Fail to load files')
        })
    },
    handleReturnFolder: function(file) {
      this.parentId = file.id
      this.filter.parentid = file.id
      let newMenu = []
      for (let i = 0; i < this.folders.length; i++) {
        newMenu.push(this.folders[i])
        if (this.folders[i].id === file.id) {
          break
        }
      }
      this.folders = newMenu
      let filter = _.clone(this.filter)
      filter.oid = this.ownerId
      API.fs
        .filter(filter)
        .then(res => {
          this.files = res.data.data
        })
        .catch(() => {
          this.$message.warning('Fail to load files')
        })
    },
    handleClickFile: function(file) {
      this.parentId = file.id
      this.filter.parentid = file.id
      let filter = _.clone(this.filter)
      filter.oid = this.ownerId
      API.fs
        .filter(filter)
        .then(res => {
          this.files = res.data.data
        })
        .catch(() => {
          this.$message.warning('Fail to load files')
        })
      if (file.type === 'dir') {
        this.folders.push(file)
        this.folder = file
      } else {
      }
    },
    showFileMenu: function(file) {
      console.log('menu clicked', file)
      this.editingFile = file
      this.$refs.menu.open()
    },
    onClickMenu: function(target, data, operate) {
      this.fileDetail = data
      this.folder.name = data.name
      if (operate == 'delete') {
        API.fs
          .delete(this.fileDetail.id)
          .then(res => {
            this.$message.success('删除成功!')
            this.loadData()
          })
          .catch(() => {
            this.$message.warning('Fail to delete file')
          })
      } else if (operate === 'downFile') {
        API.fs
          .download(this.folder)
          .then(res => {
            this.$message.success('下载成功！')
          })
          .catch(() => {
            this.$message.warning('Fail to download file')
          })
      }
      console.log('menu clicked', target, data)
    },
    next(folder) {
      this.folders.push(folder)
      this.folder = folder
    },
    prev() {
      if (this.folders.length > 0) {
        this.folders.pop()
      }
    },
    showCreateFolderForm: function() {
      this.folder = {}
      console.log('this.parentId' + this.parentId)
      this.folder.parentId = this.parentId
      this.folderDialogVisible = true
    },
    showRenameFolderDialogVisible: function() {
      console.log('this.fileDetail' + JSON.stringify(this.fileDetail))
      this.RenameFolderDialogVisible = true
    },
    handleSaveFolder: function() {
      let file = {
        ownerId: this.ownerId,
        type: 'dir',
        name: this.folder.name,
        parentId: this.folder.parentId
      }
      API.fs
        .save(file)
        .then(() => {
          this.$message.success('create folder success!')
          this.loadData()
        })
        .catch(() => {
          this.$message.warning('Fail to load files')
        })
      this.folderDialogVisible = false
    },
    handleRenameFolder: function() {
      console.log('this.rename=' + this.rename)
      this.folder.name = this.rename
      let file = { id: this.fileDetail.id, name: this.folder.name }
      API.fs
        .rename(file)
        .then(() => {
          this.$message.success('Rename success!')
          this.RenameFolderDialogVisible = false
          this.loadData()
        })
        .catch(() => {
          this.$message.warning('Fail to load files')
        })
      this.folderDialogVisible = false
    },
    handleFileUploaded: function() {
      console.log('this. file :' + JSON.stringify(this.file))
      this.loadData()
      this.dialogVisible = false
    },
    loadData: function() {
      let filter = _.clone(this.filter)
      filter.oid = this.ownerId
      API.fs
        .filter(filter)
        .then(res => {
          this.files = res.data.data
        })
        .catch(() => {
          this.$message.warning('Fail to load files')
        })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.tags.push({ name: inputValue })
        console.log(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleUpload: function() {
      this.file = { ownerId: this.ownerId, parentId: this.parentId }
      console.log('this.file ' + JSON.stringify(this.file))
      this.dialogVisible = true
    }
  },
  mounted: function() {
    this.loadData()
  }
}
</script>
<style lang="less">
.dir,
.doc {
  font-size: 64px;
}

.dir {
  color: #9775ae;
}

.doc {
  color: #666666;
}
</style>
