import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getUid } from '@/scripts/utils/auth' // 验权 // 验权

const whiteList = ['/login', '/401', '/404'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    next()
    return
  }
  NProgress.start()
  let uid = getUid()
  if (uid) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.permissionsLoaded) {
        next()
        NProgress.done()
      } else {
        console.log('permission not loaded')
        store
          .dispatch('GetMe')
          .then(permissions => {
            console.log('got permissions:', permissions)
            if (!permissions || permissions.length === 0) {
              next('/401')
            } else {
              store.dispatch('GenerateRoutes', { permissions }).then(() => {
                console.log('routes generated')
                // 根据roles权限生成可访问的路由表
                router.addRoutes(store.getters.dynamicRouters) // 动态添加可访问路由表
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              })
            }
          })
          .catch(err => {
            console.log('router get right err', err)
            window.location.href = '/user.html'
          })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      window.location.href = '/user.html'
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
