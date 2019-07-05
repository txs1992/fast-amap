import Vue from 'vue'
import App from './app.vue'

// 这个是打包后的模块用于测试，开发时将其注释。
// This is the packaged module for testing and commenting it out during development.
// import MenuSidebar from '../lib/index.js'
// // import MenuSidebar from './menu-sidebar/index.js'

// Vue.use(MenuSidebar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
