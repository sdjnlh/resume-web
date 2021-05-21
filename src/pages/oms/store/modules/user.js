import API from '@/api/api'
import {
  getToken,
  removeNickName,
  setNickName,
  setUserName,
  setUid
} from '../../../../scripts/utils/auth'
import Cookies from 'js-cookie'
import de from "element-ui/src/locale/lang/de";

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    user: {},
    permissions: [],
    roles: [],
    permissionsLoaded: false
  },

  mutations: {
    SET_ROLES: (state, roles) => {
        debugger
      console.log('roles', JSON.stringify(roles))
      let permissions = {}
      if (roles) {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].permissions) {
            for (let j = 0; j < roles[i].permissions.length; j++) {
              permissions[roles[i].permissions[j]] = true
            }
          }
        }
      }
      state.roles = roles || []
      state.permissions = Object.keys(permissions) || []
      console.log('state.permissions', JSON.stringify(state.permissions))
      state.permissionsLoaded = true
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_USER: (state, user) => {
      console.log('set user store', user)
      state.user = user
    },
    SET_USER_NAME: (state, name) => {
      state.name = name
    },
    SET_PERMISSIONS: (state, permissions) => {
      console.log('set permissions', permissions)
      state.permissions = permissions
      state.permissionsLoaded = true
    }
  },

  actions: {
    // 登录
    Login({ commit, state, rootState }, userInfo) {
      console.log('login begin')
      return new Promise((resolve, reject) => {
        API.app
          .login(userInfo)
          .then(response => {
           debugger
            let user = response.data
            console.log('login user', user)
            setUserName(user.username)
            setUid(user.id)
            Cookies.set('userMobile', user.mobile)
            commit('SET_USER', user)
            resolve()
          })
          .catch(error => {
            console.log('login err response:', error.response)
            console.log('login err:', error)
            reject(error)
          })
      })
    },
    // 获取用户信息
    GetMe({ commit, state }) {
      return new Promise((resolve, reject) => {
        API.app
          .getInfo()
          .then(res => {
            debugger
            let user = res.data
            // commit('SET_PERMISSIONS', user.permissions || [])
            commit('SET_USER', user)
            commit('SET_ROLES', user.roles)
            resolve(state.permissions)
          })
          .catch(err => {
            console.log('go rights err', err)
            reject(err)
          })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        API.app
          .logout(state.token)
          .then(() => {
            commit('SET_USER', {})
            removeNickName()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
