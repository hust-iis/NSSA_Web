import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import './assets/css/global.css';
import 'echarts-gl';
import * as echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue2OrgTree from 'vue2-org-tree'
import VueParticles from "vue-particles";
import './mock/index.js'

Vue.use(VueParticles);
Vue.use(ElementUI)
Vue.use(Vue2OrgTree)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false


//导航守卫加入token判断
router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    next();
  } else {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next("/");
    }
  }
});

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
