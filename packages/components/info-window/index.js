import FastInfoWindow from './info-window'

FastInfoWindow.install = function(Vue) {
  Vue.component(FastInfoWindow.name, FastInfoWindow)
}

export default FastInfoWindow
