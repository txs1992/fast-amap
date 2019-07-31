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
      handler: '$_amapMixin_handleOptionsChange'
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

    createInstance(option) {
      const AMap = this.getAMapInstance()
      const polygon = new AMap.Polygon(option)

      // 添加 $_amapMixin_addEvents 无法注册的事件
      polygon.on('change', this.handleChangeEvnet)
      this.$_amapMixin_addEvents(polygon, events)
      polygon.dataOptions = option
      return polygon
    },

    addPolygons(options, beforeCreate) {
      this.$_amapMixin_addInstances(options, beforeCreate)
    },

    clearAll() {
      this.$_amapMixin_clearAll('polygons', events, instances => {
        this.removeChangeEvents(instances)
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

    getInstanceOptions() {
      return this.$_amapMixin_getInstanceOptions()
    }
  }
}
