import cloneDeep from 'lodash.clonedeep'

import { warn } from '../../utils/utils'
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
    this.clearAll()
  },

  methods: {
    handleChangeEvnet() {
      this.$emit('change')
    },

    showAll() {
      this.polygonInstanceList.forEach(instance => instance.show())
    },

    hideAll() {
      this.polygonInstanceList.forEach(instance => instance.hide())
    },

    getAllPolygons() {
      return this.polygonInstanceList
    },

    getPolygonByProp(propName, propValue) {
      return this.polygonInstanceList.find(
        it => it.dataOptions[propName] === propValue
      )
    },

    getPolygonByProps(propName, propValues) {
      if (!Array.isArray(propValues)) {
        warn('propValues is an array.')
        return
      }

      const serarhMap = {}
      this.polygonInstanceList.forEach(instance => {
        const data = instance.dataOptions
        serarhMap[data[propName]] = instance
      })

      const searchList = []
      propValues.forEach(v => {
        if (serarhMap[v]) searchList.push(serarhMap[v])
      })
      return searchList
    },

    removeChangeEvents(polygons) {
      polygons.forEach(polygon => {
        polygon.off('change', this.handleChangeEvnet)
      })
    },

    removePolygons(polygons) {
      if (!Array.isArray(polygons)) {
        warn('polygons is not an Array.')
        return
      }
      const { mid, polygonInstanceList } = this
      const map = this.getMapInstance(mid)

      this.removeChangeEvents(polygons)
      this.removeEvents(polygons, events, 'polygons')

      map.remove(polygons)
      polygons.forEach(polygon => {
        const index = polygonInstanceList.indexOf(polygon)
        if (index > -1) {
          polygonInstanceList.splice(index, 1)
        }
      })
    },

    createPolygon(option) {
      const AMap = this.getAMapInstance()
      const polygon = new AMap.Polygon(cloneDeep(option))

      // 添加 addEvents 无法注册的事件
      polygon.on('change', this.handleChangeEvnet)
      this.addEvents(polygon, events)
      polygon.dataOptions = option
      return polygon
    },

    addPolygons(options, beforeCreatePolygon) {
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

        const polygonOption = beforeCreatePolygon
          ? beforeCreatePolygon(mergeOption, index)
          : mergeOption

        const polygon = this.createPolygon(polygonOption)
        polygonOptions.push(polygon)
      })
      map.add(polygonOptions)
      this.polygonInstanceList = this.polygonInstanceList.concat(polygonOptions)
    },

    clearAll() {
      const { mid, polygonInstanceList: polygons } = this
      const map = this.getMapInstance(mid)
      this.removeChangeEvents(polygons)
      this.removeEvents(polygons, events, 'polygons')
      map.remove(polygons)
      this.polygonInstanceList = []
    },

    handlePolygonsChange() {
      this.getAMapPromise().then(() => {
        const map = this.getMapInstance(this.mid)
        // 如果已经有 polygon 实例，清除所有实例
        this.clearAll()
        const options = this.getPolygonOptions()
        options.forEach(option => {
          const polygon = this.createPolygon(option)
          this.polygonInstanceList.push(polygon)
        })
        map.add(this.polygonInstanceList)
      })
    },

    getPropsOptions() {
      const {
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
      const { path, options, beforeCreatePolygon } = this
      const propsOptions = this.getPropsOptions()

      const polygonOptions = []

      options.forEach((option, index) => {
        const mergeOption = {
          ...propsOptions,
          path: path[index],
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
