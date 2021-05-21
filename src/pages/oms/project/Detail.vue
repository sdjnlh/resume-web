<template lang="pug">
    .bg-white.p-4.w-100
        .pf-title 项目详情
        .mt-3.df-row-ac-jb
            //.pf-subhead
                | 名称：{{domain.name}}
        .df-row-ac-jb.mt-3
            .pf-subhead 基本信息
            //.text-blue(@click='showDetail(0)')
                .el-icon-edit
                    | 编辑
        .df-row-as.flex-wrap.w-100
            .w-30.mt-3
                span.label.label-lg 名称：
                span.mr-2 {{domain.name}}
            .w-30.mt-3
                span.label.label-lg 主标题：
                span.mr-2 {{domain.title}}
            .w-30.mt-3
                span.label.label-lg 副标题：
                span.ml-2 {{domain.subTitle}}
        .mt-3.df-row-ac-jb
            .pf-subhead 项目图片

        .w-100.mt-3.df-row-as
            div(class="demo-image")
                div(class="block" v-for="(url, index) in domain.coverImage" :key="index")
                    el-image(:src="url" style="width: 200px; height: 200px")
        .mt-3.df-row-ac-jb
            .pf-subhead 简介

        .pt-3
            .pf-subhead.ml-4 {{domain.content}}


</template>
<script>
  import API from '@/api/api'

  export default {
    name: 'SupplierDetail',
    components: {},
    data() {
      return {
        id: '',
        types: '',
        cates: [],
        activeName: 'first',
        suppliers: [],
        // 图片上传路径
        uploadPath: 'https://srxianzhangmen.com/api/v1/file',
        previewVisible: false,
        previewImage: '',
        fileList: [],
        // 记录临时数据
        extra: {},
        // 卖点
        tags: [],
        description: '',
        item: {},
        domain: {},
        data: [],
      }
    },
    methods: {
      loadPartner() {
        API.project.get(this.id).then(res => {
          this.domain = res.data
          let str = ''
          this.types = str
          if (res.data.coverImage) {

              let image = {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: res.data.coverImage,
                thumbUrl: res.data.coverImage
              }
              this.fileList.push(image)

          }
        })
          .catch(err => {
          })
      }
    },
    mounted() {
      this.id = this.$route.params.id
      if (this.$route.params.id) {
        this.loadPartner()
      }
    }
  }
</script>


<style scoped>
</style>
