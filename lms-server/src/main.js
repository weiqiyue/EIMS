/*
 * @Author: your name
 * @Date: 2021-04-09 13:44:05
 * @LastEditTime: 2021-04-16 19:49:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\main.js
 */
/*
 * @Author: your name
 * @Date: 2021-02-12 21:23:32
 * @LastEditTime: 2021-02-25 21:57:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lms-server\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import {Notification,Message} from 'element-ui'   //消息提示插件
import 'element-ui/lib/theme-chalk/index.css';
/* 引入bootstrap */
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/assets/style/xq_navbar.css'
import '../src/assets/style/xq.css'
// import './assets/js/jquery.mCustomScrollbar.js'
// import './assets/style/jquery.mCustomScrollbar.min.css'


Vue.use(ElementUI);

Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


