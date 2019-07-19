import cloneDeep from 'lodash.clonedeep'

// import { warn } from '../../utils/utils'
import events from '../polygons/events'
import AMapMixin from '../../mixins/a-map'

import PolyPropMixin from '../../mixins/poly-prop'

export default {
  name: 'FastPolyline',

  mixins: [AMapMixin, PolyPropMixin],

  props: {
    beforeCreatePolygon: Function,
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
    },

    options: {
      type: Array,
      default() {
        return []
      }
    }
  },

  watch: {
    options: {
      immediate: true,
      handler: 'handlePolygonsChange'
    }
  },

  created() {
    if (!this.polylineInstanceList) {
      this.polylineInstanceList = []
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
          this.polylineInstanceList.push(polyline)
        })
        map.add(this.polylineInstanceList)
      })
    },

    createPolyline(option) {
      const AMap = this.getAMapInstance()
      const polyline = new AMap.Polyline(cloneDeep(option))

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
      const { mid, polylineInstanceList: polylines } = this
      const map = this.getMapInstance(mid)
      this.removeChangeEvents(polylines)
      this.$_amapMixin_removeEvents(polylines, events, 'polylines')
      map.remove(polylines)
      this.polylineInstanceList = []
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
      const { path, options, beforeCreatePolygon } = this
      const propsOptions = this.getPropsOptions()

      const polylineOptions = []

      options.forEach((option, index) => {
        const mergeOption = {
          ...propsOptions,
          path: path[index],
          ...option
        }

        const polylineOption = beforeCreatePolygon
          ? beforeCreatePolygon(mergeOption, index)
          : mergeOption

        polylineOptions.push(cloneDeep(polylineOption))
      })

      return polylineOptions
    }
  },

  render() {
    return null
  }
}