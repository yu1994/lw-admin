import { constantRoutes } from '@/router'
import { generateRoutes } from '@/api/user'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * F递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  buttonPermission: {}
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
function reflectComponents(serverRouterMap) {
  serverRouterMap.forEach((item) => {
    let com = ''
    if (item.component.indexOf('layout') >= 0) {
      com = item.component
    } else {
      com = 'views/' + item.component
    }
    item.component = resolve => require(['@/' + com + '/index.vue'], resolve)
    // item.component = map[item.component]
    if (item.meta && item.meta.permission) {
      state.buttonPermission[item.name] = item.meta.permission
    }
    if (item.children && item.children.length > 0) {
      reflectComponents(item.children)
    }
  })
  serverRouterMap.push({ path: '*', redirect: '/404', hidden: true })
  return serverRouterMap
}
const actions = {
  // 动态权限路由
  generateRoutes({ commit, state, rootState }, roles) { // 获取动态路由
    return new Promise(resolve => {
      generateRoutes(rootState.user.token).then(response => {
        const asyncRouterMap = reflectComponents(response.data)
        commit('SET_ROUTES', asyncRouterMap)
        resolve(asyncRouterMap)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
