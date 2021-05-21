<template lang="pug">
  .bg-file.w-100.border.df-row-ac-ja.position-relative(style="height:400px;")
    .fill.position-absolute.df-row-ac-ja(v-if='file.type === 1', style='background-color:rgba(0,0,0,0.2);')
      el-upload.df-row-ac-ja.text-dark(:class='[hasCover ? "w-40 h-75" : "w-100 h-100"]',
      drag, multiple, :http-request="uploadImages", :action='action', :show-file-list="false", :before-upload="beforeImageUpload", :on-success="handleSuccess", :auto-upload="true", ref="imageUpload")
        i.el-icon-upload(style='font-size: 40px;')
        .el-upload__text
          h5.text-primary.mr-2 图片
          | 将文件拖到此处，或
          em 点击上传
          span.ml-2 可多选
    .fill.position-absolute.d-flex.flex-row.align-items-center.justify-content-center(v-if='file.type === 2', style='background-color:rgba(0,0,0,0.2);')
      el-upload.df-col-ac-ja.text-dark.mt-5(:on-change="handleVideoChange", :file-list="vfs", :action='action', :auto-upload="false", :limit="2" drag, multiple)
        i.el-icon-upload(style='font-size: 40px;')
        .el-upload__text
          h5.text-primary.mr-2 请选择mp4视频和封面
          | 将文件拖到此处，或
          em 点击选择
        el-progress(:percentage="mainProgress")
      .df-col
      el-button.ml-4(type='primary', @click="uploadVideo") 点击上传
    .fill.position-absolute.df-row-ac-ja(v-if='file.type !== 1 && file.type !== 2', style='background-color:rgba(0,0,0,0.2);')
      el-upload.df-row-ac-ja.text-dark(:class='[hasCover ? "w-40 h-75" : "w-100 h-100"]', :data='domain', :with-credentials='true',
      drag, :action='action', :show-file-list="false", :on-success="handleSuccess", :on-error="onError", :before-upload="beforeMainUpload", :on-progress="progress")
        i.el-icon-upload(style='font-size: 40px;')
        .el-upload__text
          h5.text-primary.mr-2 主文件
          | 将文件拖到此处，或
          em 点击上传
        el-progress(:percentage="mainProgress")
      el-upload.h-75.w-40.df-row-ac-ja.text-dark(v-if='hasCover', :data='cover', :action='action', drag, :with-credentials='true',
      :show-file-list="false", :on-success="handleSuccess", :on-error="onError", :before-upload="beforeCoverUpload")
        i.el-icon-upload(style='font-size: 40px;')
        .el-upload__text
          h5.text-primary.mr-2 封面图片
          | 将文件拖到此处，或
          em 点击上传
    .fab(v-show='file.id > 0 && front')
      el-button(@click='handleView' size='mini' icon="el-icon-view" circle)
</template>

<script>
import FileRender from './render'
import API from '@/api/api'
//import FS from '@/utils/fs'

export default {
  name: 'FileEditor',
  components: { FileRender },
  props: {
    file: {
      type: Object,
      required: true
    },
    front: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: process.env.API_BASE + '/files'
    }
  },
  data() {
    return {
      domain: {},
      cover: {},
      notifyTime: 0,
      mainProgress: 0,
      videos: [],
      vfs: []
    }
  },
  computed: {
    hasCover: function() {
      return this.file.type !== FS.types.IMAGE
    }
  },
  watch: {
    file: function(newVal) {
      console.log('file changed in editor', JSON.stringify(newVal))
      this.prepareData()
    }
  },
  methods: {
    prepareData: function() {
      var domain = {}
      var cover = {}
      if (this.file.id) {
        domain.id = this.file.id
        cover.id = this.file.id
      }
      if (this.file.tag) {
        domain.tag = this.file.tag
      }
      if (this.file.type) {
        domain.type = this.file.type
      }
      if (this.file.ownerId) {
        domain.ownerId = this.file.ownerId
      }

      this.domain = domain
      this.cover = cover
    },
    beforeImageUpload: function(file) {
      console.log('before image upload')
    },
    beforeCoverUpload: function(file) {
      console.log('before upload')
      if ((this.hasCover && this.file.id == null) || this.file.id <= 0) {
        this.$message.error('请先上传主文件')
        return false
      }
      this.cover.type = FS.types.IMAGE
      this.cover.tag = FS.tags.COVER
    },
    uploadImages: function(item) {
      const formData = new FormData()
      if (this.domain.id) {
        formData.append('id', this.domain.id)
      }
      if (this.domain.type) {
        formData.append('type', this.domain.type)
      }
      if (this.domain.tag) {
        formData.append('tag', this.domain.tag)
      }
      if (this.domain.ownerId) {
        formData.append('ownerId', this.domain.ownerId)
      }
      formData.append('file', item.file)
      API.fs
        .upload(formData)
        .then(res => {
          var time = new Date().getTime()
          if (time > this.notifyTime + 5000) {
            this.notifyTime = time
            this.$emit('file-uploaded', res.data)
          }
        })
        .catch(() => {
          this.$message.error(
            '文件:' + item.file.name + ' 上传失败，请稍候上传余下文件！'
          )
        })
    },
    handleVideoChange: function(file, files) {
      console.log('file changed')
      this.videos = files
    },
    uploadVideo: function() {
      if (this.videos == null || this.videos.length !== 2) {
        this.$message.error('请选择视频和封面文件，然后上传')
        return
      }

      var file1 = this.videos[0]
      var file2 = this.videos[1]
      var fileName1 = file1.name.toLowerCase()
      var fileName2 = file2.name.toLowerCase()
      var cover, video

      if (
        (fileName1.endsWith('.png') || fileName1.endsWith('.jpg') > 0) &&
        fileName2.endsWith('.mp4')
      ) {
        cover = file1
        video = file2
      } else if (
        (fileName2.endsWith('.png') || fileName2.endsWith('.jpg') > 0) &&
        fileName1.endsWith('.mp4')
      ) {
        cover = file2
        video = file1
      } else {
        this.$message.error('您选择的文件有误，请选择mp4视频和封面文件')
        return
      }

      console.log('start upload video')
      this.mainProgress = 0

      var self = this
      qcVideo.ugcUploader.start({
        videoFile: video.raw,
        coverFile: cover.raw,
        getSignature: function(callback) {
          console.log('get signature')
          API.videoFs
            .getSignature()
            .then(result => {
              var signature = result.data.data
              console.log(signature)
              callback(signature)
            })
            .catch(() => {
              this.$message.error('获取签名失败!')
            })
        },
        progress: function(result) {
          if (result.type === 'video') {
            console.log(
              '上传进度：' + 100 * result.shacurr + JSON.stringify(result)
            )
            self.mainProgress = Math.ceil(100 * result.curr)
          }
        },
        error: function(result) {
          console.log('上传失败的result：' + result)
          console.log('上传失败的原因：' + result.msg)
        },
        finish: function(result) {
          console.log('上传成功的result：' + result)
          console.log('上传结果的fileId：' + result.fileId)
          console.log('上传结果的视频名称：' + result.videoName)
          console.log('上传结果的视频地址：' + result.videoUrl)
          console.log('封面名称：' + result.coverName)
          console.log('封面地址：' + result.coverUrl)

          var file = {
            fid: result.fileId,
            type: self.file.type,
            tag: self.file.tag,
            name: result.videoName,
            url: result.videoUrl,
            ownerId: self.file.ownerId
          }
          file.cover = { url: result.coverUrl }
          API.fs
            .saveMeta(file)
            .then(response => {
              self.vfs = []
              self.$message.success('上传成功!')
              self.$emit('file-uploaded', response.data)
            })
            .catch(() => {
              self.$message.error('保存视频记录失败!')
            })
        }
      })
    },
    beforeMainUpload: function() {
      this.mainProgress = 0
    },
    progress: function(event) {
      console.log('progress', event)
      this.mainProgress = event.percent
    },
    handleView: function() {
      this.$emit('view-file', this.file)
    },
    handleSuccess: function(res) {
      console.log('upload file success')
      this.$emit('file-uploaded', res.data)
    },
    onError: function() {
      console.log('upload file error')
      this.$message.error('上传失败，请稍后重试')
    }
  },
  mounted: function() {
    console.log('file on mounted in editor', JSON.stringify(this.file))
    this.prepareData()
  }
}
</script>

<style scoped>
.w-40 {
  width: 40%;
}

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
