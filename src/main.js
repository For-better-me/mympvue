import Vue from 'vue'
import App from './App'
import store from './store/index'
import api from './utils/api'
import _http from './utils/http'
import _util from './utils/index'
import _login from './utils/login'
import login from '@/components/login'

import 'mpvue-calendar/src/style.css'
Vue.prototype.$store = store;
Vue.prototype.$api = api.api;
Vue.prototype.$http = _http;
Vue.prototype.$util = _util;
Vue.prototype.$login = _login;
Vue.prototype.$imgPrefix = api.imgPrefix;
Vue.component('login', login);
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
