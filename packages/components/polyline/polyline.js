import { warn } from '../../utils/utils'
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
      handler: 'handlePolygonsChange'
    }
  },

  methods: {
    handlePolygonsChange() {
      this.getAMapPromise().then(() => {
        const map = this.getMapInstance(this.mid)
        // 如果已经有 polyline 实例，清除所有实例
        this.clearAll()
        const options = this.getPolylineOptions()
        options.forEach(option => {
          const polyline = this.createPolyline(option)
          this.instanceList.push(polyline)
        })
        map.add(this.instanceList)
      })
    },

    addPolylines(options, beforeCreate) {
      if (!Array.isArray(options)) {
        warn('options is not an Array.')
        return
      }
      const propsOption = this.getPropsOptions()
      const map = this.getMapInstance(this.mid)
      const polylineOptions = []

      options.forEach((option, index) => {
        const mergeOption = {
          ...propsOption,
          ...option
        }

        const polylineOption = beforeCreate
          ? beforeCreate(mergeOption, index)
          : mergeOption

        const polyline = this.createPolyline(polylineOption)
        polylineOptions.push(polyline)
      })
      map.add(polylineOptions)
      this.instanceList = this.instanceList.concat(polylineOptions)
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

    createPolyline(option) {
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

    getPolylineOptions() {
      const { path, options, beforeCreate } = this
      const propsOptions = this.getPropsOptions()

      const polylineOptions = []

      options.forEach((option, index) => {
        const mergeOption = {
          ...propsOptions,
          path: path[index],
          ...option
        }

        const polylineOption = beforeCreate
          ? beforeCreate(mergeOption, index)
          : mergeOption

        polylineOptions.push(polylineOption)
      })

      return polylineOptions
    }
  }
}
