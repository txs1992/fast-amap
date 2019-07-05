import FastMap from './components/map/index'
import FastPolygons from './components/polygons/index'

import MapOptions from './utils/map-options'
import mapLoader, { mapOptionLoader } from './utils/map-loader'
import MapRegistry from './utils/map-instance-registry'

function install(Vue) {
  ;[FastMap, FastPolygons].forEach(cpt => cpt.install(Vue))
}

const registry = MapRegistry.getRegistryInstance()

const mapOptions = MapOptions.getOptionsInstance()

export default { install, registry, mapOptions, mapLoader, mapOptionLoader }
