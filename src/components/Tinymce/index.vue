<template lang="pug">
  .tinymce-container.editor-container(:class='{ fullscreen: fullscreen }')
    textarea.tinymce-textarea(:id='tinymceId')
    .editor-custom-btn-container
      el-button(@click='onTapUpload', size='mini') 媒体库上传
    el-dialog(append-to-body='', :visible.sync='dialogVisible')
      filer(:types='types', :ownerid='fileOwner', :tag='tag', @select-file='handleFileSelected')
    el-dialog(:visible.sync="descImageVisible"  :modal-append-to-body="true")
      image-gallery(selectable='true' @selected='handleDescImageSelected')
      // <div class="w-100 text-center">
        // <el-button @click="dialogVisible = false">关闭</el-button>
      // </div>


</template>

<script>
import Filer from '../Filer'
import plugins from './plugins'
import toolbar from './toolbar'
import FS from '@/utils/fs'
import ImageGallery from '@/pages/console/media/ImageGallery'


export default {
  name: 'tinymce',
  components: { Filer, ImageGallery },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    },
    types: {
      type: Array,
      default: function() {
        return [{ value: '1', name: '图片', editable: false, selectable: true }]
      }
    },
    fileOwner: {
      type: String
    },
    tag: {
      type: String
    }
  },
  data() {
    return {
      descImageVisible: false,
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date(),
      fullscreen: false,
      dialogVisible: false,
      fsBase: process.env.VUE_APP_FS_BASE,
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        language: 'zh_CN',
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', e => {
            _this.fullscreen = e.state
          })
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    onTapUpload: function() {
      // if (this.fileOwner == null || this.fileOwner <= 0) {
      //   this.$message.warning('请先保存图片归属信息')
      //   return
      // }
      //this.dialogVisible = true
      this.descImageVisible = true

    },
    handleFileSelected(file) {
      console.log('file selected', JSON.stringify(file))
      const _this = this
      var url = FS.url(file.url)
      window.tinymce
        .get(_this.tinymceId)
        .insertContent('<img class="wscnph" src=' + url + ' >')
      this.dialogVisible = false
      console.log('file selected', JSON.stringify(file))
    },
    handleDescImageSelected(file) {
      const _this = this
      let url = _this.fsBase + file.url
      window.tinymce
              .get(_this.tinymceId)
              .insertContent('<img class="" src=' + url + ' >')
      _this.descImageVisible = false
      console.log('file selected', JSON.stringify(file), url)

    },
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
}

.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
