import Vue from 'vue'
import '../../theme/index.css'
import ElementUI from 'element-ui'
import App from '../../App.vue'
import store from '../oms/store'
import router from './router'
// import VueRouter from 'vue-router'
import '@/styles/index.scss'

Vue.use(ElementUI)
// Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
