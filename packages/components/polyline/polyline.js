import events from '../polygons/events'
import AMapMixin from '../../mixins/a-map'

import PolyPropMixin from '../../mixins/poly-prop'

export default {
  name: 'FastPolyline',

  mixins: [AMapMixin, PolyPropMixin],

  props: {
    geodesic: Boolean,
    isOutline: Boolean,

    lineCap: {
      type: String,
      default: 'butt'
    },

    lineJoin: {
      type: String,
      default: 'miter'
    },

    outlineColor: {
      type: String,
      default: '#000000'
    },

    borderWeight: {
      type: Number,
      default: 1
    }
  },

  watch: {
    options: {
      immediate: true,
      handler: '$_amapMixin_handleOptionsChange'
    }
  },

  methods: {
    addPolylines(options, beforeCreate) {
      this.$_amapMixin_addInstances(options, beforeCreate)
    },

    removePolylines(polylines, propName) {
      this.$_amapMixin_removeInstances(
        'polylines',
        events,
        polylines,
        propName,
        () => {
          this.removeChangeEvents(polylines)
        }
      )
    },

    createInstance(option) {
      const AMap = this.getAMapInstance()
      const polyline = new AMap.Polyline(option)

      // 添加 $_amapMixin_addEvents 无法注册的事件
      polyline.on('change', this.handleChangeEvnet)
      this.$_amapMixin_addEvents(polyline, events)
      polyline.dataOptions = option
      return polyline
    },

    removeChangeEvents(polylines) {
      polylines.forEach(polyline => {
        polyline.off('change', this.handleChangeEvnet)
      })
    },

    handleChangeEvnet() {
      this.$emit('change')
    },

    clearAll() {
      this.$_amapMixin_clearAll('polylines', events, instances => {
        this.removeChangeEvents(instances)
      })
    },

    getPropsOptions() {
      const {
        cursor,
        bubble,
        zIndex,
        extData,
        showDir,
        lineCap,
        lineJoin,
        geodesic,
        isOutline,
        draggable,
        fillColor,
        fillOpacity,
        strokeColor,
        strokeStyle,
        borderWeight,
        outlineColor,
        strokeWeight,
        strokeOpacity,
        strokeDasharray
      } = this

      return {
        cursor,
        bubble,
        zIndex,
        extData,
        showDir,
        lineCap,
        lineJoin,
        geodesic,
        isOutline,
        draggable,
        fillColor,
        fillOpacity,
        strokeColor,
        strokeStyle,
        borderWeight,
        outlineColor,
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
