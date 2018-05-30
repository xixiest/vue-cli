import Vue from 'vue'
import VueEvents from 'vue-event-handler'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import router from '@/router'
import store from '@/store'
import '@/permission' // 权限
import commonFiltes from '@/filters'
import AsUI from 'as-ui'
import 'as-ui/src/demos/Form/css/form.css'
Vue.use(AsUI)
Vue.use(ElementUI, { locale, size: 'medium' })
Vue.use(VueEvents)
Vue.config.productionTip = false

// 加载全局过滤器
Object.keys(commonFiltes).forEach(key => {
  Vue.filter(key, commonFiltes[key])
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
