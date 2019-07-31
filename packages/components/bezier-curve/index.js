import FastBezierCurve from './bezier-curve'

FastBezierCurve.install = function(Vue) {
  Vue.component(FastBezierCurve.name, FastBezierCurve)
}

export default FastBezierCurve
