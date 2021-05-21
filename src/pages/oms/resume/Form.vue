<template lang="pug">
    .w-100.p-5
        el-input.ml-5.w-20( v-model="version" placeholder="输入简历版本" size="small")
            template(slot="append" )
               el-button(type='primary' size="mini" @click="uploadfile") | 添加/上传简历
        .pf-title {{title}}
        el-form.w-50(:model='domain', :rules='ruleForm', ref='form', label-width='150px')
            el-form-item(label='简历名称:', prop='name')
                el-input.w-100(v-model='domain.name',  placeholder="请输入简历名称")
            el-form-item(label='简历版本:', prop='version' )
                el-input.w-100(v-model='domain.version', disabled="true"  placeholder="请输入简历版本")
            el-form-item(label='简历路径:', prop='version' )
                el-input.w-100(v-model='domain.path', disabled="true"  placeholder="请输入简历路径")
            el-form-item(label="是否发布:")
                el-switch(v-model='domain.isPublish')
            .df-row-ac-jc.mt-5
                el-button( size='large', @click='handleCancel')  取消
                el-button.ml-3(type='primary' size="large"   @click="handleSave") 保存
        el-dialog(:visible.sync='showUpload' :modal-append-to-body="true")
            .w-100
                el-upload(ref='upload', action='', :http-request="handleUpload", :file-list='fileList', :auto-upload='false')
                    el-button(slot='trigger', size='small', type='primary') 选取文件
                    el-button(style='margin-left: 10px;', size='small', type='success', @click='submitUpload') 上传到服务器
                    .el-upload__tip(slot='tip') 只能单个文件

</template>

<script>
import API from '@/api/api'

export default {
  name: 'FirmwareForm',
  data() {
    return {
      version:"",
      domain: {},
      title: '',
      showUpload:false,
      fileList:[],
      ruleForm: {
        name: [
          {
            required: true,
            message: '请输入简历名称',
            trigger: 'blur'
          }
        ],
        version:[
          {
            required: true,
            message: '请输入简历版本',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    uploadfile() {
      if (!this.version){
        this.$message.warning("请输入版本号后上传！")
        return
      }
      this.showUpload = true
      this.fileList=[]

    },
    handleUpload(it) {
      var that =this
      var formData = new FormData()
      formData.append("version",that.version)
      formData.append('file[]', it.file)
      API.resume.upload(formData).then((res) => {
        that.$message.success('上传成功')
        this.showUpload=false
        that.domain=res.data
      }).catch((err) => {
        that.$message.success('上传失败')
        that.showUpload = false
      })
    },
    handleSave() {
      let that = this
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }

        // id存在的话，调更新接口， 否则调新建接口
        let api = that.$route.query.id ? API.resume.update : API.resume.create
        api(that.domain)
          .then(res => {
            that.$message.success('保存成功！')
            this.$router.push({
              path: '/resume/home'
            })
          })
          .catch(err => {
            that.$message.error('保存失败，请稍后重试！')
          })
      })
    },
    handleCancel() {
      // 取消保存
      this.$router.push({
        path: '/resume'
      })
    },
    getDomain(id) {
      // 获取单条型号数据
      API.model
        .get(id)
        .then(res => {
          let data = res.data.data
          this.domain = data
        })
        .catch(err => {
          this.$message.error('数据获取失败！')
        })
    }
  },
  mounted() {
    // 传参id 如果有获取数据
    if (this.$route.query.id) {
      this.getDomain(this.$route.query.id)
      this.title = '编辑简历'
    } else {
      this.title = '添加简历'
    }
  }
}
</script>

<style scoped>
</style>
