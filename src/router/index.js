import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('@/views/home/index')
const category = () => import('@/views/category/index')
const cart = () => import('@/views/cart/index')
const profile = () => import('@/views/profile/index')
const detail = () => import('@/views/detail/index')


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },//默认路由配置
  { path: '/home', component: home },
  { path: '/category', component: category },
  { path: '/cart', component: cart },
  { path: '/profile', component: profile },
  { path: '/detail/:iid', component: detail}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
