import Vue from 'vue'
import App from './app.vue'
import router from './router'

import FastAMap from '../lib/fast-amap.mini'

FastAMap.mapOptions.setOptions({
  key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
  version: '1.4.15'
})

Vue.use(FastAMap)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
