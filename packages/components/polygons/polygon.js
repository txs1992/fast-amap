import { warn } from '../../utils/utils'
import events from './events'
import AMapMixin from '../../mixins/a-map'
import AMapPropMixin from '../../mixins/poly-prop'

export default {
  name: 'FastPolygon',

  mixins: [AMapMixin, AMapPropMixin],

  props: {
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
      immediate: true,
      handler: 'handlePolygonsChange'
    }
  },

  methods: {
    handleChangeEvnet() {
      this.$emit('change')
    },

    removeChangeEvents(polygons) {
      polygons.forEach(polygon => {
        polygon.off('change', this.handleChangeEvnet)
      })
    },

    removePolygons(polygons, propName) {
      this.$_amapMixin_removeInstances(
        'polygons',
        events,
        polygons,
        propName,
        () => {
          this.removeChangeEvents(polygons)
        }
      )
    },

    createPolygon(option) {
      const AMap = this.getAMapInstance()
      const polygon = new AMap.Polygon(option)

      // 添加 $_amapMixin_addEvents 无法注册的事件
      polygon.on('change', this.handleChangeEvnet)
      this.$_amapMixin_addEvents(polygon, events)
      polygon.dataOptions = option
      return polygon
    },

    addPolygons(options, beforeCreate) {
      if (!Array.isArray(options)) {
        warn('options is not an Array.')
        return
      }
      const propsOption = this.getPropsOptions()
      const map = this.getMapInstance(this.mid)
      const polygonOptions = []

      options.forEach((option, index) => {
        const mergeOption = {
          ...propsOption,
          ...option
        }

        const polygonOption = beforeCreate
          ? beforeCreate(mergeOption, index)
          : mergeOption

        const polygon = this.createPolygon(polygonOption)
        polygonOptions.push(polygon)
      })
      map.add(polygonOptions)
      this.instanceList = this.instanceList.concat(polygonOptions)
    },

    clearAll() {
      this.$_amapMixin_clearAll('polygons', events, instances => {
        this.removeChangeEvents(instances)
      })
    },

    handlePolygonsChange() {
      this.getAMapPromise().then(() => {
        const map = this.getMapInstance(this.mid)
        // 如果已经有 polygon 实例，清除所有实例
        this.clearAll()
        const options = this.getPolygonOptions()
        options.forEach(option => {
          const polygon = this.createPolygon(option)
          this.instanceList.push(polygon)
        })
        map.add(this.instanceList)
      })
    },

    getPropsOptions() {
      const {
        cursor,
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
        strokeDasharray
      } = this

      return {
        cursor,
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
        strokeDasharray
      }
    },

    getPolygonOptions() {
      const { path, options, beforeCreate } = this
      const propsOptions = this.getPropsOptions()

      const polygonOptions = []

      options.forEach((option, index) => {
        const mergeOption = {
          ...propsOptions,
          path: path[index],
          ...option
        }

        const polygonOption = beforeCreate
          ? beforeCreate(mergeOption, index)
          : mergeOption

        polygonOptions.push(polygonOption)
      })

      return polygonOptions
    }
  }
}
