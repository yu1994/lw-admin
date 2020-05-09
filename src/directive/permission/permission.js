import store from '@/store'
export default {
  inserted(el, binding, vnode) { // 按钮权限 根据 当时后端传的情况 做出改变
    const { value } = binding
    if (value && value instanceof Array && value.length > 0) {
      // const res = store.getters.permission_button[value[0]]
      // const hasPermission = res.includes(value[0]+'-'+value[1]);
      // if (!hasPermission) {
      //   el.parentNode && el.parentNode.removeChild(el)
      // }
    } else {
      return false
    }
  }
}
