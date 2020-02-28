import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/js/validate.js' 
import 'mint-ui/lib/style.css'
import MintUi from 'mint-ui'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import 'swiper/dist/css/swiper.css';
import scroll from 'vue-seamless-scroll'
import { Indicator } from 'mint-ui'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Tree } from 'element-ui';

Vue.use(scroll)
Vue.use(VueClipboard)
Vue.use(Vuex)
Vue.prototype.$axios = axios
axios.defaults.headers['X-REQUESTED-WITH'] = 'xmlhttprequest'
Vue.use(MintUi)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Tree)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$Indicator = Indicator

import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
VueTouch.config.swipe = {
  threshold: 50 //手指左右滑动距离
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
})
