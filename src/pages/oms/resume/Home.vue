<template lang="pug">
    .components-container
        .w-100.panel
            .df-row-ac-jb
                .df-row-ac
                    .line
                    .pf-title.ml-3 简历管理
                el-button(type="primary" icon="el-icon-plus" size="small" @click="handleAdd") 新增简历
            .mt-3.df-row-ac
                el-input.ml-2.w-20(prefix-icon="el-icon-search" v-model="filter.name" placeholder="输入简历名称" size="small")
                    template(slot="append" )
                        el-button(size="small" @click="loadList" ) 查询
            .bg-white.mt-3.df-row-ac.flex-wrap.px-3.pt-3.pb-5
                div(v-if="domains.length === 0" style="display:flex;justify-content:center;width:100%;margin-top:5px")
                    p.w100.text-center 无历史简历版本
                .border.w-30.m-3.p-3(v-for="resume in domains")
                    .df-row-ac
                        .ml-3
                            .fs-12 {{resume.crt | normalTime}}
                            .pf-subhead.mt-2 {{resume.name}}
                    .mt-3
                        span  简历版本:
                        span {{resume.version }}
                    .mt-4.df-row-ac-jb

                        .fs-12
                            span 更新类型:
                            span(v-if="resume.type==='1'") 客户手动更新
                            span(v-else-if="resume.type==='0'") 默认更新
                            span(v-else) 未配置
                        .fs-12
                            span 是否发布:
                            el-switch.ml-3(v-model='resume.isPublish' @change="updatefrimware(resume)")
                        .fs-12.df-row-ac
                            el-button(@click.stop="handleDelete(resume)" style="color:#686868" plain, circle) 删除
                            .pointer.text-blue |
                            el-button(type="primary" @click="downloadFile(resume)" plain, circle) 下载
                            .blue-arrow.ml-1
            .col-12.mt-3
                .row.justify-content-center
                    el-pagination(@size-change='onPageSizeChanged', @current-change='onPageChanged', :current-page='filter.p', :page-sizes='[10, 15, 25]', :page-size='filter.ps', layout='total, sizes, prev, pager, next, jumper', :total='count')
                //el-dialog(:title='title', :visible.sync='formVisible', :close-on-click-modal='false' width="900px")
                  emergency-detail(:id="editingId", ref="emergencyDetail")
</template>

<script>
import API from '@/api/api'
export default {
  name: 'FirmwareHome',
  data() {
    return {
      filter: {
        K: '',
        p: 1,
        ps: 10,
        prop: '',
        order: '',
        type: ''
      },
      domains:[],
      listLoading: false,
      pager: {
        page: 1,
        pageSize: 10,
        count: 0
      },
      models: []
    }
  },
  watch: {},
  methods: {
    updatefrimware(params){
      API.resume.update(params).then(()=>{
        this.loadList()
      }).catch((err)=>{

      })
    },
    downloadFile(params){
      API.resume.download(params).then((res)=>{
        console.log("二进制流")
        console.log(res)
        if (!res) {
          return
        }
        let headers = res.headers
        let blob = new Blob([res.data], {
          type: headers['Content-Type']
        })
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = window.URL.createObjectURL(blob)
        link.setAttribute('download', param.name)
        document.body.appendChild(link)
        link.click()
      }).catch((err)=>{
        this.$notification['error']({
          message: '二维码生成错误',
          description:
          err,
        });
        console.log("请求失败")
      })
    },
    handleDelete: function(row) {
      // 删除用户前弹出层，点击按钮删除该条用户
      this.$confirm('确认删除该内容吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          // 删除操作
          this.listLoading = true
          API.resume.delete(row.id).then(res => {
            this.listLoading = false
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
            this.loadList()
          })
        })
        .catch(() => {
          // 取消删除操作
          this.listLoading = false
          console.log('删除失败')
        })
    },
    onPageSizeChanged: function(val) {
      // 设置一页显示呃数据条数
      this.filter.ps = val
      // 第一页
      this.filter.p = 1
      this.loadList()
    },
    onPageChanged: function(val) {
      // 选择页数
      this.filter.p = val
      this.loadList()
    },
    loadList: function() {
      // 获取所有型号数据
      API.resume
        .list(this.filter)
        .then(res => {
            debugger
          this.domains = res.data.data
          this.listLoading = true
          this.pager.count = parseInt(res.data.page.cnt)
        })
        .catch(function() {
          //this.$message.error("获取设备信息失败！")
        })
    },
    handleView: function(val) {
      this.$router.push({
        path: '/resume/create?id=' + val
      })
    },
    handleAdd: function() {
      this.$router.push({
        path: '/resume/create'
      })
    },
    sortChange: function(column) {
      console.log('column', column)
      if (column.prop == null || column.order == null) {
        this.filter.prop = ''
        this.filter.order = ''
      } else {
        let prop = ''
        if (column.order === 'ascending') {
          column.order = 'asc'
        } else {
          column.order = 'desc'
        }
        if (column.prop === 'name') {
          prop = 'name'
        } else if (column.prop === 'createdAt') {
          prop = 'created_at'
        } else {
          prop = column.prop
        }
        this.filter.prop = prop
        this.filter.order = column.order
        this.loadList()
      }
    }
  },
  mounted() {
    this.loadList()
  }
}
</script>

<style scoped></style>
