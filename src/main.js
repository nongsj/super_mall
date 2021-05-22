import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from '@/components/common/toast/index.js'

import lazy_img from '@/assets/img/common/t3.jpg'


// 安装toast插件
Vue.use(toast)

Vue.config.productionTip = false

// 解决移动端300秒延迟
FastClick.attach(document.body);

// 使用图片懒加载插件
Vue.use(VueLazyLoad,{
  loading:lazy_img
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//https://github.com/coderwhy/supermall 老师github项目地址
//npm install @better-scroll/core  滚动插件