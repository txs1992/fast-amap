import { mapOptionLoader } from '../utils/map-loader'
import MapRegistry from '../utils/map-instance-registry'
import { warn } from '../utils/utils'

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
      return registry.getMap(mid || this.mid)
    },

    setMapInstance(mid, instance) {
      registry.setMap(mid, instance)
    },

    deleteMapInstance(mid) {
      registry.deleteMap(mid)
    },

    handleEvents(event) {
      this.$emit(event.type, event, this.getMapInstance(this.mid))
    },

    addEvents(instance, events) {
      events.forEach(evnet => {
        instance.on(evnet, this.handleEvents)
      })
    },

    removeEvents(instanceList, events, name) {
      if (Array.isArray(instanceList)) {
        instanceList.forEach(instance => {
          events.forEach(evnet => {
            instance.off(evnet, this.handleEvents)
          })
        })
      } else {
        warn(`${name} is not an array.`)
      }
    }
  }
}
