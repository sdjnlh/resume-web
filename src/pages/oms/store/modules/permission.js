import { constantRouterMap, menuMap } from '../../router'

function hasPermission(permissionMap, route) {
  if (route.meta && route.meta.permissions) {
    return route.meta.permissions.every(permission => permissionMap[permission])
  } else {
    return true
  }
}

function filterAsyncRouter(routes, permissionMap) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.children) {
      tmp.children = filterAsyncRouter(tmp.children, permissionMap)
      if (tmp.children && tmp.children.length > 0) {
        res.push(tmp)
      }
      return
    }
    if (hasPermission(permissionMap, tmp)) {
      res.push(tmp)
    } else {
      console.log('has no permission route', tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    dynamicRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.dynamicRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { permissions } = data
        console.log('GenerateRoutes by permissions:', permissions)
        if (permissions == null) {
          resolve()
          return
        }
        let permissionMap = {}
        permissions.forEach(permission => {
          permissionMap[permission] = true
        })
        commit('SET_ROUTERS', filterAsyncRouter(menuMap, permissionMap))
        resolve()
      })
    }
  }
}

export default permission
