<template>
  <div class="app-wrapper" :class="classObj">
    <nav-bar></nav-bar>
    <div ><app-main></app-main></div>
  </div>
</template>

<script>
import { AppMain, NavBar } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    // Navbar,
    // Sidebar,
    AppMain,
    NavBar
  },
  mixins: [ResizeMixin],
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      fullHeight: document.documentElement.clientHeight - 130
    }
  },

  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    // handleClickOutside() {
    //   this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    // }
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
