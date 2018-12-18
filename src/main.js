import Vue from 'vue'
import App from './App'
import store from './store/index'
import api from './utils/api'
import _http from './utils/http'
import _util from './utils/index'


Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$http = _http;
Vue.prototype.$util = _util;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
