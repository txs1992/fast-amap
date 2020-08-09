import FastMap from './components/map'
import FastText from './components/text'
import FastMarker from './components/marker'
import FastCircle from './components/circle'
import FastPolygon from './components/polygons'
import FastPolyline from './components/polyline'
import FastMassMarks from './components/mass-marks'
import FastInfoWindow from './components/info-window'
import FastBezierCurve from './components/bezier-curve'
import FastCircleMarker from './components/circle-marker'

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
  FastMassMarks,
  FastInfoWindow,
  FastBezierCurve,
  FastCircleMarker
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
  FastPolygon,
  FastPolyline,
  FastMassMarks,
  FastInfoWindow,
  FastBezierCurve,
  FastCircleMarker
}
