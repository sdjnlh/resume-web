import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '../../layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('./Login')
  },
  {
    path: '/signup',
    component: () => import('./SignUp')
  },
  {
    path: '/password/change',
    hidden: true,
    name: 'password',
    meta: {
      title: 'Change password',
      icon: 'lock'
    },
    component: () => import('./ChangePassword')
  }
]

export const notFoundRouterMap = [{ path: '*', redirect: '/404', hidden: true }]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
