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

    $_amapMixin_createOffset(offset, name = 'offset') {
      if (!Array.isArray(offset)) {
        warn(`${name} is not an Array.`)
        return
      }
      const AMap = this.getAMapInstance()

      const [x, y] = offset
      let offsetPixel = null
      try {
        offsetPixel = new AMap.Pixel(x, y)
      } catch (e) {
        warn(`${name} creation failed.`, e)
      }
      return offsetPixel
    },

    $_amapMixin_setMapInstance(mid, instance) {
      registry.setMap(mid, instance)
    },

    $_amapMixin_deleteMapInstance(mid) {
      registry.deleteMap(mid)
    },

    $_amapMixin_handleEvents(event) {
      this.$emit(event.type, event, this.getMapInstance(this.mid))
    },

    $_amapMixin_addEvents(instance, events) {
      events.forEach(evnet => {
        instance.on(evnet, this.$_amapMixin_handleEvents)
      })
    },

    $_amapMixin_removeEvents(instanceList, events, name) {
      if (Array.isArray(instanceList)) {
        instanceList.forEach(instance => {
          events.forEach(evnet => {
            instance.off(evnet, this.$_amapMixin_handleEvents)
          })
        })
      } else {
        warn(`${name} is not an array.`)
      }
    }
  }
}
