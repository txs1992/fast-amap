import cloneDeep from 'lodash.clonedeep'

import { warn } from '../../utils/utils'
import events from './events'
import AMapMixin from '../../mixins/a-map'

export default {
  name: 'FastMarker',

  mixins: [AMapMixin],

  props: {
    icon: [String, Object],
    title: String,
    label: Object,
    angle: Number,
    shape: null,
    shadow: Object,
    cursor: String,
    bubble: Boolean,
    extData: null,
    content: [String, Object],
    draggable: Boolean,
    clickable: Boolean,
    raiseOnDrag: Boolean,
    topWhenClick: Boolean,
    autoRotation: Boolean,

    beforeCreatePolygon: Function,

    anchor: {
      type: String,
      default: 'top-left'
    },

    zIndex: {
      type: Number,
      default: 100
    },

    visible: {
      type: Boolean,
      default: true
    },

    options: {
      type: Array,
      default() {
        return []
      }
    },

    offset: {
      type: Array,
      default() {
        return []
      }
    },

    position: {
      type: Array,
      default() {
        return []
      }
    },

    animation: {
      type: String,
      default: 'AMAP_ANIMATION_NONE'
    }
  },

  watch: {
    options: {
      immediate: true,
      handler: 'handleOptionsChange'
    }
  },

  created() {
    // 由于需要将高德地图与 vue 解耦，所以这里创建的 polygon 数组不能被 vue watch。
    if (!this.markerInstanceList) {
      this.markerInstanceList = []
    }
  },

  methods: {
    handleEvents(event) {
      this.$emit(event.type, event, this.getMapInstance(this.mid))
    },

    handleOptionsChange() {
      this.getAMap().then(AMap => {
        const map = this.getMapInstance(this.mid)
        const options = this.getPolygonOptions()
        options.forEach(option => {
          const marker = this.createMarker(option)
          this.markerInstanceList.push(marker)
        })
        map.add(this.markerInstanceList)
      })
    },

    createMarker(option) {
      if (!Array.isArray(option.offset)) {
        warn('offset is not an Array.')
        return
      }
      const [x, y] = option.offset
      option.offset = new AMap.Pixel(x, y)
      const marker = new AMap.Marker(cloneDeep(option))
      events.forEach(evnet => {
        marker.on(evnet, this.handleEvents)
      })
      marker.dataOptions = option
      return marker
    },

    getPropsOptions() {
      const {
        icon,
        title,
        label,
        angle,
        shape,
        offset,
        shadow,
        cursor,
        bubble,
        zIndex,
        visible,
        extData,
        content,
        draggable,
        clickable,
        animation,
        raiseOnDrag,
        topWhenClick,
        autoRotation
      } = this

      return {
        icon,
        title,
        label,
        angle,
        shape,
        offset,
        shadow,
        cursor,
        bubble,
        zIndex,
        visible,
        extData,
        content,
        draggable,
        clickable,
        animation,
        raiseOnDrag,
        topWhenClick,
        autoRotation
      }
    },

    getPolygonOptions() {
      const { position, options, beforeCreatePolygon } = this
      const propsOptions = this.getPropsOptions()

      const markerOptions = []

      options.forEach((option, index) => {
        const mergeOption = {
          ...propsOptions,
          position: position[index],
          ...option
        }

        const markerOption = beforeCreatePolygon
          ? beforeCreatePolygon(mergeOption, index)
          : mergeOption

        markerOptions.push(cloneDeep(markerOption))
      })

      return markerOptions
    }
  },

  render() {
    return null
  }
}
