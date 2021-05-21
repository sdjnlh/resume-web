// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../../App'
import router from './router'

import ElementUI from 'element-ui'
import '@/theme/index.css'
import '@/styles/index.scss'
import '@/scripts/bootstrap'
Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
