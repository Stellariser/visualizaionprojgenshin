import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import Vuex from 'vuex';
//引入 echarts
import echarts from 'echarts'

import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'
//注册组件


import axios from './axios'

import Base64 from 'js-base64'
Vue.use(Vuesax, {
  // options here
})
Vue.use(ElementUI);
Vue.use('Base64')

const query =Vue.extend({})
const q = new query
Vue.prototype.queryevent = q
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Element)
// require('./mock')

// console.log = function() {}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
