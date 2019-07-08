import { mapOptionLoader } from '../utils/map-loader'
import MapRegistry from '../utils/map-instance-registry'

const registry = MapRegistry.getRegistryInstance()

let AMapInstance = null

export default {
  props: {
    mid: {
      type: [String, Number],
      required: true
    }
  },

  created() {
    mapOptionLoader().then(AMap => {
      AMapInstance = AMap
    })
  },

  methods: {
    getAMapPromise() {
      return mapOptionLoader()
    },

    getAMapInstance() {
      return AMapInstance
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
