import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [
  { path: '/', component: () => import('./pages/map.vue') },
  { path: '/marker', component: () => import('./pages/marker.vue') },
  { path: '/icon', component: () => import('./pages/icon.vue') },
  { path: '/text', component: () => import('./pages/text.vue') },
  { path: '/polyline', component: () => import('./pages/polyline.vue') },
  { path: '/polygon', component: () => import('./pages/polygon.vue') },
  { path: '/bezier-curve', component: () => import('./pages/bezier-curve.vue') }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

Vue.use(VueRouter)

export default router
