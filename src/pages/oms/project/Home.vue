<template lang="pug">
    section.components-container
        .w-100.bg-white.p-3
            .df-row-ac-jb
                div
                    el-input.w-300p(v-model='filter.k', placeholder='请输入项目查询内容' size="small")
                    el-button.ml-3(type='primary' icon="el-icon-search" @click='loadList' size="small")  查询
                .df-row-ac
                    router-link.mr-20p(to='/project/create')
                        el-button(type='success' size="small"  icon="el-icon-plus") 新增项目
            el-table.mt-3(:data='projects', highlight-current-row='', :loading='listLoading', border='',@row-dblclick='handleEdit',@sort-change="sortChange", stripe='')
                el-table-column(prop='name' label='项目名称' sortable="custom" align='center' min-width="120")
                    template(slot-scope='scope')
                        .df-col-as-jb.h-75
                            router-link(:to="'/project/'+scope.row.id")
                                a(href='javascript:;', style='color: dodgerblue') {{scope.row.name}}
                el-table-column(prop='title' label='主标题' sortable="custom" align='center',  min-width="80")
                el-table-column(prop='subTitle' label='副标题',  align='center', width="120")
                el-table-column(prop='crt' label='创建时间' sortable="custom",width='140' align='center ')
                    template(slot-scope='scope')
                        span {{scope.row.crt | formatDay}}
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
    name: 'projectHome',
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
        projects: []
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

        this.projects = []
        API.project
          .list(this.filter)
          .then(res => {
            this.projects = res.data.data
            this.listLoading = true
            this.pager.count = parseInt(res.data.page.cnt)
          })
          .catch(function() {
            this.$message.error('save.failed')
          })
      },
      handleEdit: function(val) {
        this.$router.push({
          path: '/project/edit?id=' + val.id
          //query: { k: this.filter.k, source: 'PH', tab: 'storageBilling' }
        })
      },
      handleDelete: function(val) {
        this.$confirm('确认删除该内容吗?', '提示', {
          type: 'warning'
        }).then(() => {
          API.project.delete(val.id).then(() => {
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
      },
    },
    mounted() {
      this.loadList()
    }
  }
</script>

<style scoped></style>
