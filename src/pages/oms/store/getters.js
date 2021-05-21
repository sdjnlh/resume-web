const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  name: state => state.user.username,
  username: state => state.user.username,
  permissions: state => state.user.permissions,
  permissionsLoaded: state => state.user.permissionsLoaded,
  user: state => state.user.user,
  permission_routers: state => state.permission.routers,
  dynamicRouters: state => state.permission.dynamicRouters
}
export default getters
