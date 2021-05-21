<template lang="pug">
    .bg-white.p-4.w-100
        .pf-title 工作详情
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
                span.label.label-lg 公司名称：
                span.mr-2 {{domain.commpany}}
            .w-30.mt-3
                span.label.label-lg 职位：
                span {{domain.jobs}}
            .w-30.mt-3
                span.label.label-lg 联系人：
                span.mr-2 {{domain.legalPerson}}
            .w-30.mt-3
                span.label.label-lg 联系电话：
                span.ml-2 {{domain.phone}}
            .w-30.mt-3
                span.label.label-lg 开始时间：
                span.ml-2 {{domain.startTime | formatDay}}
            .w-30.mt-3
                span.label.label-lg 结束时间：
                span.ml-2 {{domain.endTime | formatDay}}
            .w-100.mt-3
                span.label.label-lg 心得体会：
                span.mr-2 {{domain.harvest}}


</template>
<script>
  import API from '@/api/api'

  export default {
    name: 'Detail',
    components: {},
    data() {
      return {
        id: '',
        types: '',
        cates: [],
        suppliers: [],
        // 图片上传路径
        uploadPath: '',
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
      loadWork() {
        API.work.get(this.id).then(res => {
          this.domain = res.data
        })
          .catch(err => {
          })
      }
    },
    mounted() {
      this.id = this.$route.params.id
      if (this.$route.params.id) {
        this.loadWork()
      }
    }
  }
</script>


<style scoped>
</style>
