import Vue from 'vue'
import Router from 'vue-router'
// import app from '../App.vue'
// import home from '../pages/home/home.vue'
// import search from '../pages/search/search.vue'
// import order from '../pages/order/order.vue'
// import user from '../pages/user/user.vue'
import login from '../pages/login/login.vue'
import shop from '../pages/shop/shop.vue'
import shopgoods from '../pages/shop/shopgoods/shopgoods.vue'
import shopinfo from '../pages/shop/shopinfo/shopinfo.vue'
import shopratings from '../pages/shop/shopratings/shopratings.vue'
const home = () => import('../pages/home/home.vue')
const search = () => import('../pages/search/search.vue')
const order = () => import('../pages/order/order.vue')
const user = () => import('../pages/user/user.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home', meta: { showFooter: true }},
    {path: '/home', component: home, meta: { showFooter: true }},
    {path: '/search', component: search, meta: { showFooter: true }},
    {path: '/order', component: order, meta: { showFooter: true }},
    {path: '/user', component: user, meta: { showFooter: true }},
    {path: '/login', component: login},
    {
      path: '/shop',
      component: shop,
      children: [
        {path: '', redirect: '/shop/shopgoods'},
        {path: '/shop/shopgoods', component: shopgoods},
        {path: '/shop/shopinfo', component: shopinfo},
        {path: '/shop/shopratings', component: shopratings}
      ]
    }
  ]
})
