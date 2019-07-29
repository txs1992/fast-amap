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

    hideAll() {
      this.polylineInstanceList.forEach(polyline => polyline.hide())
    },

    showAll() {
      this.polylineInstanceList.forEach(polyline => polyline.show())
    },

    getAllPolylines() {
      return this.polylineInstanceList.slice(0)
    },

    getPolylineByProp(propName, propValue) {
      return this.polylineInstanceList.find(
        it => it.dataOptions[propName] === propValue
      )
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
      this.polylineInstanceList = this.polylineInstanceList.concat(
        polylineOptions
      )
    },

    getPolylineByProps(propName, propValues) {
      if (!Array.isArray(propValues)) {
        warn('propValues is an array.')
        return
      }

      const searchMap = {}
      this.polylineInstanceList.forEach(instance => {
        const data = instance.dataOptions
        searchMap[data[propName]] = instance
      })

      const searchList = []
      propValues.forEach(v => {
        if (searchMap[v]) searchList.push(searchMap[v])
      })
      return searchList
    },

    removePolylines(polylines, propName) {
      if (!Array.isArray(polylines)) {
        warn('polylines is not an Array.')
        return
      }
      const { mid, polylineInstanceList: list } = this
      const map = this.getMapInstance(mid)

      this.removeChangeEvents(polylines)
      this.$_amapMixin_removeEvents(polylines, events, 'polylines')

      map.remove(polylines)

      if (propName) {
        const searchMap = {}

        list.forEach((item, index) => {
          searchMap[item.dataOptions[propName]] = index
        })

        polylines.forEach((polyline, len) => {
          const index = searchMap[polyline.dataOptions[propName]]
          if (index > -1) {
            list.splice(index - len, 1)
          }
        })
      } else {
        polylines.forEach(polyline => {
          const index = list.indexOf(polyline)
          if (index > -1) {
            list.splice(index, 1)
          }
        })
      }
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
  },

  render() {
    return null
  }
}
