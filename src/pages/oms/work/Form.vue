<template lang="pug">
    section.components-container
        .w-100.bg-white.p-4
            .pf-title.pb-3 {{title}}
            el-form(:model='domain', :rules='rule', ref='form' label-width='180px')
                el-form-item(label='公司名称:', prop='' )
                    el-input.w-50(v-model='domain.commpany',  placeholder="请输入公司名称")
                el-form-item(label='职位:', prop='' )
                    el-input.w-50(v-model='domain.jobs',  placeholder="请输入公司名称")
                el-form-item(label='联系人姓名:', prop='legalPerson')
                    el-input.w-50(v-model='domain.legalPerson', placeholder="")
                el-form-item(label='联系电话:', prop='phone')
                    el-input.w-50(v-model='domain.phone', placeholder="")
                el-form-item(label='开始时间:', prop='startTime')
                    el-date-picker(v-model="domain.startTime" type="date" placeholder="选择日期" style="width: 50%")
                el-form-item(label='结束时间:', prop='timeRange')
                    el-date-picker(v-model="domain.endTime" type="date" placeholder="选择日期" style="width: 50%")
                el-form-item(label='显示顺序:', prop='timeRange')
                    el-input.w-50(v-model='domain.no', placeholder="")
                el-form-item(label='心得收获:', prop='description')
                    el-input.w-50(v-model='domain.harvest', type='textarea' :rows='5' placeholder="")
            .col-12.mb-4.text-center.w-50
                el-button(type='primary', @click='handleSave') 保存
                el-button(size='middle', @click='handleCancel') 取消

            el-dialog(:visible.sync='previewVisible' :modal-append-to-body="false")
                img(width='100%', :src='previewImage', alt='')
</template>

<script>
import API from '@/api/api'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  name: 'PartnerForm',
  data() {
    return {
      traderTags:[],

      selectedOptions: [],
      regionData: regionData,
      previewImage: '',
      domain: { type: [], startTime: new Date() },
      fileList: [],
      uploadPath: 'http://op.dazhangduo.com/api/v1/file',
      title: '添加工作经验',
      id: '',
      imagePath: [],
      previewVisible: false,
      rule: {
        name: [
          {
            required: true,
            message: '请输入企业名称',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleRegion(region) {
      let areaName = []
      region.forEach(item => {
        if (item.length > 0) {
          areaName.push(CodeToText[item])
        }
      })
      this.domain.area = areaName
    },

    loadWork() {
      API.work.get(this.id).then(res => {
          this.domain = res.data
        })
        .catch(err => {
        })
    },
    handleSave() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.domain.license = this.imagePath
        var api = this.domain.id ? API.work.update : API.work.create
        api(this.domain)
          .then(res => {
            // this.domain = res.data
            this.$message.success('保存成功!')
            this.$router.replace('/work/home')
          })
          .catch(err => {
            this.$message.error('保存失败!')
          })
      })
    },
    handleCancel() {
      this.$router.push('/work/home')
    },
    reback(data, text) {
      //switch 不行
      if (text === 'traderTag') {
        this.traderTags= data
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      if (this.id !== '') {
        this.loadWork()
      }
    }
  }
}
</script>

<style scoped>
</style>
