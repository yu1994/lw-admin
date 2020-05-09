const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  tableLoading: state => state.pack.tableLoading,
  permission_routers: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  permission_button: state => state.permission.buttonPermission
}
export default getters
