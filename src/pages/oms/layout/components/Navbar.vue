<template lang="pug">
  el-menu.navbar-vue.df-row-ac(mode='horizontal')
    .flex-1.df-row-ac
      hamburger.hamburger-container(:toggle-click='toggleSideBar', :is-active='sidebar.opened')
    .flex-1.df-row-ac
      el-dropdown.avatar-container(trigger='click')
        .pointer.df-row-ac-jc
          span.mr-2 {{username}}
          i.iconfont.icon-yonghu
          i.el-icon-caret-bottom
        el-dropdown-menu.user-dropdown(slot='dropdown')
          router-link.inlineBlock(to='/')
            el-dropdown-item 首页
          el-dropdown-item(@click.native="changePassword" ) 修改密码
          el-dropdown-item(divided='')
            span(@click='logout', style='display:block;') 登出

</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import LangSelect from '@/components/LangSelect'
import Cookies from 'js-cookie'
import _ from 'lodash'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    LangSelect
  },
  data() {
    return {
      username: '',
      keyword: '',
      isShowLayOut: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
      // 'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    changePassword() {
      window.location.href = '/user.html#/password/change'
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
        window.location.href = '/user.html'
      })
    },
    search: function() {
      console.log('search', this.$store.getters.roles)
      if (_.intersection(this.$store.getters.roles, ['si', 'sic', 'scm', 'ss'])) {
        this.$router.push({
          path: '/surrogacy/search',
          params: { keyword: this.keyword }
        })
      }
    }
  },
  mounted() {
    if (Cookies.get('nickname') && Cookies.get('nickname') != '') {
      this.username = Cookies.get('nickname')
    } else if (Cookies.get('username')  && Cookies.get('username') != '') {
      this.username = Cookies.get('username')
    } else if (Cookies.get('userMobile')  && Cookies.get('userMobile') != '') {
      this.username = Cookies.get('userMobile')
    }
    this.roles = Cookies.get('role')
    for (let i=0;i<this.roles.length;i++){
      if (this.roles[i] === "1") {
        this.isShowLayOut = true
      }else {
        this.isShowLayOut = false
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar-vue {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .lang {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 100px;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
