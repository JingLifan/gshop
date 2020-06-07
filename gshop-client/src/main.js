// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入mui组件库样式包
import './common/mui/css/mui.css'

// 导入阿里巴巴图标样式库
import './common/icon/icons.css'

// 引入reset.css格式化样式文件
import './common/reset.css'

// 引入MintUI组件库
import MintUI from 'mint-ui'

// 引入MintUI样式库
import 'mint-ui/lib/style.css'

// 引入Vuex仓储模块store
import store from './store/index'

// 引入mockServer
import './mock/mockServer.js'

// 引入日期格式化组件
import Moment from 'moment'

// 引入loading图片
// import loading from './loading.gif'
// 引入vue-lazyload图片懒加载
import VueLazyLoad from 'vue-lazyload'

// 引入axios
import axios from 'axios'
// 配置axios
// axios.defaults.baseURL = '/api'
Vue.prototype.$ajax = axios
Vue.use(MintUI)

// 使用vue-lazyload
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  loading: './loading.gif',
  attempt: 1
})

// 配置日期格式化组件
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:MM') {
  return Moment(dataStr).format(pattern)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
