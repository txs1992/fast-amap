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
    },

    options: {
      type: Array,
      default() {
        return []
      }
    },

    beforeCreate: Function
  },

  created() {
    mapOptionLoader().then(AMap => {
      AMapInstance = AMap
    })

    // 由于需要将高德地图与 vue 解耦，所以这里创建的实例数组不能被 vue watch。
    if (!this.instanceList) {
      this.instanceList = []
    }
  },

  beforeDestroy() {
    if (typeof this.clearAll === 'function') this.clearAll()
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

    showAll() {
      this.instanceList.forEach(instance => instance.show())
    },

    hideAll() {
      this.instanceList.forEach(instance => instance.hide())
    },

    getAll() {
      return this.instanceList.slice(0)
    },

    getInstanceByProp(propName, propValue) {
      return this.instanceList.find(
        it => it.dataOptions[propName] === propValue
      )
    },

    getInstanceByProps(propName, propValues) {
      if (!Array.isArray(propValues)) {
        warn('propValues is an array.')
        return
      }

      const searchMap = {}
      this.instanceList.forEach(instance => {
        const data = instance.dataOptions
        searchMap[data[propName]] = instance
      })

      const searchList = []
      propValues.forEach(v => {
        if (searchMap[v]) searchList.push(searchMap[v])
      })
      return searchList
    },

    $_amapMixin_clearAll(name, events, beforeClear) {
      const { mid, instanceList: instances } = this
      const map = this.getMapInstance(mid)
      this.$_amapMixin_removeEvents(instances, events, name)
      if (typeof beforeClear === 'function') beforeClear(instances)
      map.remove(instances)
      this.instanceList = []
    },

    $_amapMixin_removeInstances(
      name,
      events,
      instances,
      propName,
      beforeRemove
    ) {
      if (!Array.isArray(instances)) {
        warn(`${name} is not an Array.`)
        return
      }
      const { mid, instanceList: list } = this
      const map = this.getMapInstance(mid)

      this.$_amapMixin_removeEvents(instances, events, name)

      if (typeof beforeRemove === 'function') beforeRemove(instances)

      map.remove(instances)

      if (propName) {
        const searchMap = {}

        list.forEach((item, index) => {
          searchMap[item.dataOptions[propName]] = index
        })

        instances.forEach((polygon, len) => {
          const index = searchMap[polygon.dataOptions[propName]]
          if (index > -1) {
            list.splice(index - len, 1)
          }
        })
      } else {
        instances.forEach(polygon => {
          const index = list.indexOf(polygon)
          if (index > -1) {
            list.splice(index, 1)
          }
        })
      }
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
  },

  render() {
    return null
  }
}
