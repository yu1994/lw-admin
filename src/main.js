import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import i18n from './lang/index'

import '@/icons' // icon
import '@/permission' // permission control
import { pagination } from './components/LoginTemplate'
import { errorMessage, formChooseRules, formInputRules } from './utils/validate'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale, size: 'small' }).use(pagination)

Vue.config.productionTip = false
Vue.prototype.$errorMessage = errorMessage
Vue.prototype.$formChooseRules = formChooseRules
Vue.prototype.$formInputRules = formInputRules
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
