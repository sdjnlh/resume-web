<template lang="pug">
  .w-100.df-row-ac(style="margin-top: 1pxs;border-bottom:1px solid #D3D3D3")
    .px-3
      hamburger(:toggle-click='toggleSideBar', :is-active='sidebar.opened' v-if="device === 'mobile' ")
    .df-row-ac-jb.w-100.pl-2(v-if="device === 'desktop'" )
      .pt-2
        .df-row-ac-jb
          a(:href='baseURL')
            .logo-sur
        h4.main-text.my-2.pl-5 Surrogate Registration
      .d-flex
        .pf-subhead.pr-2 Registration
      el-dropdown.mr-5(trigger='click' style="height: 45px;")
        .pointer.df-row-ac-jc
          span.mr-2
          i.iconfont.icon-yonghu
          i.el-icon-caret-bottom
        el-dropdown-menu(slot='dropdown' )
          router-link(to='/home')
            el-dropdown-item( @click.native="toHome" ) Home
          router-link(to='/password/update')
            el-dropdown-item Change Password
          el-dropdown-item(divided='')
            span(style='display:block;') Logout
    .df-row-ac-jb.w-100.pl-2(v-if="device === 'mobile'" )
      .pt-2
        .df-row-ac-jb
          a(:href='baseURL')
            .logo-surM
        .pf-body1.main-text.my-2 Surrogate Registration
      el-dropdown.mr-5(trigger='click' style="height: 45px;")
        .pointer.df-row-ac-jc
          span.mr-2
          i.iconfont.icon-yonghu
          i.el-icon-caret-bottom
        el-dropdown-menu(slot='dropdown' )
          router-link(to='/home')
            el-dropdown-item( @click.native="toHome" ) Home
          router-link(to='/password/update')
            el-dropdown-item Change Password
          el-dropdown-item(divided='')
            span(style='display:block;') Logout


</template>

<script>
import LangSelect from '@/components/LangSelect'
import Hamburger from '@/components/Hamburger'
import Cookies from 'js-cookie'
// import { getUsername } from '@/scripts/utils/auth'
import { mapGetters } from 'vuex'
// import dict from '@/scripts/utils/dict'
export default {
  name: 'NavBar',
  components: { LangSelect, Hamburger },
  data() {
    return {
      baseURL: process.env.BASE_URL
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    toHome() {
      window.location.href = '/'
    },
    handleToReview() {
      this.$router.push({ path: '/manager/tasks' })
    },
    handleToMessage() {
      this.$router.push({ path: '/messages' })
    },
    handleCommand(command) {
      if (command === 'profile') {
        this.$router.push({ path: '/profile' })
      } else if (command === 'logOut') {
        this.$router.push({ path: '/login' })
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    },
    loadUserName() {
      // this.username = getUsername()
    },
    logout() {
      this.$store.dispatch('setLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
        window.location.href = '/user.html#/login'
      })
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    admin: function() {
      return this.roles.indexOf(dict.role.admin) > -1
    },
    manager: function() {
      return this.roles.indexOf(dict.role.manager) > -1
    },
    user: function() {
      return this.roles.indexOf(dict.role.user) > -1
    }
  },
  watch: {
    active: function(newActive) {
      this.$router.replace(newActive)
    }
  },
  mounted() {
    this.loadUserName()
  }
}
</script>

<style lang="scss" scoped>
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
</style>
