import cloneDeep from 'lodash.clonedeep'

import events from './events'
import AMapMixin from '../../mixins/a-map'
import AMapPropMixin from '../../mixins/poly-prop'

export default {
  name: 'FastPolygon',

  mixins: [AMapMixin, AMapPropMixin],

  props: {
    beforeCreatePolygon: Function,

    options: {
      type: Array,
      default() {
        return []
      }
    },

    fillColor: {
      type: String,
      default: '#FFAAA00'
    },

    fillOpacity: {
      type: Number,
      default: 0.9
    }
  },

  watch: {
    options: {
      deep: true,
      immediate: true,
      handler: 'handlePolygonsChange'
    }
  },

  created() {
    // 由于需要将高德地图与 vue 解耦，所以这里创建的 polygon 数组不能被 vue watch。
    if (!this.polygonInstanceList) {
      this.polygonInstanceList = []
    }
  },

  beforeDestroy() {
    this.removeEvents()
  },

  methods: {
    handleEvents(event) {
      this.$emit(event.type, event, this.getMapInstance(this.mid))
    },

    removeEvents() {
      const map = this.getMapInstance(this.mid)
      const { polygonInstanceList } = this
      if (polygonInstanceList && polygonInstanceList.length) {
        polygonInstanceList.forEach(instance => {
          events.forEach(evnet => {
            instance.off(evnet, this.handleEvents)
          })
        })
        map.remove(polygonInstanceList)
        this.polygonInstanceList = []
      }
    },

    handlePolygonsChange() {
      this.getAMap().then(AMap => {
        const map = this.getMapInstance(this.mid)
        // 如果已经有 polygon 实例，清除所有实例
        this.removeEvents()
        const options = this.getPolygonOptions()
        options.forEach(option => {
          const polygon = new AMap.Polygon({ ...option, map })
          events.forEach(evnet => {
            polygon.on(evnet, this.handleEvents)
          })
          polygon.dataOptions = option
          this.polygonInstanceList.push(polygon)
        })
      })
    },

    getPolygonOptions() {
      const {
        path,
        bubble,
        zIndex,
        extData,
        options,
        draggable,
        fillColor,
        fillOpacity,
        strokeColor,
        strokeStyle,
        strokeWeight,
        strokeOpacity,
        strokeDasharray,
        beforeCreatePolygon
      } = this

      const polygonOptions = []
      options.forEach((option, index) => {
        const mergeOption = {
          path: path[index],
          bubble,
          zIndex,
          extData,
          draggable,
          fillColor,
          fillOpacity,
          strokeColor,
          strokeStyle,
          strokeWeight,
          strokeOpacity,
          strokeDasharray,
          ...option
        }

        const polygonOption = beforeCreatePolygon
          ? beforeCreatePolygon(mergeOption, index)
          : mergeOption

        polygonOptions.push(cloneDeep(polygonOption))
      })

      return polygonOptions
    }
  },

  render() {
    return null
  }
}
