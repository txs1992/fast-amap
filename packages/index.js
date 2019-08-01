import FastMap from './components/map/index'
import FastText from './components/text/index'
import FastMarker from './components/marker/index'
import FastCircle from './components/circle/index'
import FastPolygon from './components/polygons/index'
import FastPolyline from './components/polyline/index'

import FastBezierCurve from './components/bezier-curve/index'

import MapOptions from './utils/map-options'
import mapLoader, { mapOptionLoader } from './utils/map-loader'
import MapRegistry from './utils/map-instance-registry'

const components = [
  FastMap,
  FastText,
  FastMarker,
  FastCircle,
  FastPolyline,
  FastPolygon,
  FastBezierCurve
]

function install(Vue) {
  components.forEach(cpt => cpt.install(Vue))
}

const registry = MapRegistry.getRegistryInstance()

const mapOptions = MapOptions.getOptionsInstance()

export default {
  install,
  registry,
  mapOptions,
  mapLoader,
  mapOptionLoader,
  FastMap,
  FastText,
  FastMarker,
  FastCircle,
  FastPolyline,
  FastPolygon,
  FastBezierCurve
}
