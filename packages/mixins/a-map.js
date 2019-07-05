import { mapOptionLoader } from '../utils/map-loader'
import MapRegistry from '../utils/map-instance-registry'

const registry = MapRegistry.getRegistryInstance()

export default {
  props: {
    mid: {
      type: [String, Number],
      required: true
    }
  },

  methods: {
    getAMap() {
      // return promise
      return mapOptionLoader()
    },

    getMapInstance(mid) {
      return registry.getMap(mid ? mid : this.mid)
    },

    setMapInstance(mid, instance) {
      registry.setMap(mid, instance)
    },

    deleteMapInstance(mid) {
      registry.deleteMap(mid)
    }
  }
}
