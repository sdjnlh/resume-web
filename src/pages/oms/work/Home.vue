<template lang="pug">
    section.components-container
        .w-100.bg-white.p-3
            .df-row-ac-jb
                div
                    el-input.w-300p(v-model='filter.k', placeholder='请输入查询内容' size="small")
                    el-button.ml-3(type='primary' icon="el-icon-search" @click='loadList' size="small")  查询
                .df-row-ac
                    router-link.mr-20p(to='/work/create')
                        el-button(type='success' size="small"  icon="el-icon-plus") 新增工作经历
                // 列表
            el-table.mt-3(:data='works', highlight-current-row='', :loading='listLoading', border='',@row-dblclick='handleEdit', stripe='')
                el-table-column(prop='commpany' label='公司名称' sortable="custom" align='center' min-width="120")
                    template(slot-scope='scope')
                        .df-col-as-jb.h-75
                            router-link(:to="'/work/'+scope.row.id")
                                a(href='javascript:;', style='color: dodgerblue') {{scope.row.commpany}}
                el-table-column(prop='jobs' label='职位' sortable="custom" width='140' align='center ')
                el-table-column(prop='no' label='排序' sortable="custom" width='140' align='center ')
                el-table-column(prop='startTime' label='开始时间' sortable="custom" align='center',  min-width="80")
                    template(slot-scope='scope')
                        span {{scope.row.startTime | formatDay}}
                el-table-column(prop='endTime' label='结束时间',  align='center', width="120")
                    template(slot-scope='scope')
                       span {{scope.row.endTime | formatDay}}
                el-table-column(prop='harvest' label='收获',  align='center', width="120")
                el-table-column(label='操作', width='140' align='center' fixed="right")
                    template(slot-scope='scope')
                        el-button(size='small', @click='handleEdit(scope.row)', type='primary', icon='el-icon-edit', plain, circle)
                        el-button(size='mini', type='danger', @click='handleDelete(scope.row)' icon="el-icon-delete" circle)
            .col-12.mt-3
                .row.justify-content-end
                    el-pagination(@size-change='onPageSizeChanged', @current-change='onPageChanged', :current-page='filter.p', :page-sizes='[10, 20, 50]', :page-size='filter.ps', layout='total, sizes, prev, pager, next, jumper', :total='pager.count')

</template>

<script>
  import API from '@/api/api'
  // import dict from '@/utils/dict'

  export default {
    name: 'PartnerHome',
    // components: {dict},
    data() {
      return {
        filter: {
          k: '',
          p: 1,
          ps: 10,
          prop: '',
          order: '',
          type: ''
        },
        listLoading: false,
        pager: {
          page: 1,
          pageSize: 10,
          count: 0
        },
        works: []
      }
    },
    watch: {
      stage: function() {
        this.loadList()
      }
    },
    methods: {
      onPageSizeChanged: function(val) {
        this.filter.ps = val
        this.filter.p = 1
        this.loadList()
      },
      onPageChanged: function(val) {
        this.filter.p = val
        this.loadList()
      },
      loadList: function() {

        this.works = []
        API.work
          .list(this.filter)
          .then(res => {

            this.works = res.data.data
            this.listLoading = true
            this.pager.count = parseInt(res.data.page.cnt)
          })
          .catch(function() {
            this.$message.error('获取失败！')
          })
      },
      handleEdit: function(val) {
        this.$router.push({
          path: '/work/create?id=' + val.id
          //query: { k: this.filter.k, source: 'PH', tab: 'storageBilling' }
        })
      },
      handleDelete: function(val) {
        this.$confirm('确认删除该内容吗?', '提示', {
          type: 'warning'
        }).then(() => {
          API.work.delete(val.id).then(() => {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
            this.loadList()
          })
        }).catch(() => {
          console.log('删除失败')
        })
        // API.work.delete(val.id).then(() => {
        //     this.$message.success('删除成功！')
        //     this.loadList()
        //   }).catch(() => {
        //     this.$message.error('删除失败！')
        //   })
      },

    },
    mounted() {
      this.loadList()
    }
  }
</script>

<style scoped></style>
