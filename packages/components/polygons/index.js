import FastPolygon from './polygon'

FastPolygon.install = function(Vue) {
  Vue.component(FastPolygon.name, FastPolygon)
}

export default FastPolygon
