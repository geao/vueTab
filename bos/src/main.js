import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'
 import Test from '@/components/public/test.vue'
 
 import access from '@/utils/has_permission.js'
 

 import VueAreaLinkage from 'vue-area-linkage';
 Vue.use(VueAreaLinkage);
 
 
 
//引入自定义图标
import './assets/myicon/iconfont.css'

Vue.config.productionTip = false
//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

 Vue.component("my-test",Test);
Vue.config.productionTip = false;
Vue.prototype.$config = config; //全局注册应用配置
Vue.prototype.$access = access;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
