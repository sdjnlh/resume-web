import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../../theme/index.css'
import '@/styles/index.scss'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import router from './router'
import '@/icons' // icon
import './permission' // permission control
import VCharts from 'v-charts'
import 'default-passive-events'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  render: h => h(App)
})
