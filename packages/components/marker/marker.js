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
    isItemIcon: Boolean,
    isItemOffset: Boolean,
    raiseOnDrag: Boolean,
    topWhenClick: Boolean,
    autoRotation: Boolean,

    beforeCreate: Function,

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
    // 由于需要将高德地图与 vue 解耦，所以这里创建的 marker 数组不能被 vue watch。
    if (!this.markerInstanceList) {
      this.markerInstanceList = []
    }
  },

  beforeDestroy() {
    this.clearAll()
  },

  methods: {
    handleMoveendEvent() {
      this.$emit('moveend')
    },

    handleMovealongEvent() {
      this.$emit('movealong')
    },

    showAll() {
      this.markerInstanceList.forEach(instance => instance.show())
    },

    hideAll() {
      this.markerInstanceList.forEach(instance => instance.hide())
    },

    getAllMarkers() {
      return this.markerInstanceList.slice(0)
    },

    clearAll() {
      const { mid, markerInstanceList: markers } = this
      const map = this.getMapInstance(mid)
      this.$_amapMixin_removeEvents(markers, events, 'markers')

      // 删除无法通过 $_amapMixin_addEvents 注册的事件。
      this.removeNotEvnetObjectEvnets(markers)

      map.remove(markers)
      this.markerInstanceList = []
    },

    getMarkerByProp(propName, propValue) {
      return this.markerInstanceList.find(
        it => it.dataOptions[propName] === propValue
      )
    },

    getMarkerByProps(propName, propValues) {
      if (!Array.isArray(propValues)) {
        warn('propValues is an array.')
        return
      }

      const searchMap = {}
      this.markerInstanceList.forEach(instance => {
        const data = instance.dataOptions
        searchMap[data[propName]] = instance
      })

      const searchList = []
      propValues.forEach(v => {
        if (searchMap[v]) searchList.push(searchMap[v])
      })
      return searchList
    },

    removeNotEvnetObjectEvnets(markers) {
      // 删除无法通过 $_amapMixin_addEvents 注册的事件。
      markers.forEach(marker => {
        marker.off('moveend', this.handleMoveendEvent)
        marker.off('movealong', this.handleMovealongEvent)
      })
    },

    removeMarkers(markers, propName) {
      if (!Array.isArray(markers)) {
        warn('markers is not an Array.')
        return
      }

      const { mid, markerInstanceList: list } = this
      const map = this.getMapInstance(mid)

      this.$_amapMixin_removeEvents(markers, events, 'markers')
      this.removeNotEvnetObjectEvnets(markers)

      map.remove(markers)

      if (propName) {
        const searchMap = {}

        list.forEach((item, index) => {
          searchMap[item.dataOptions[propName]] = index
        })

        markers.forEach((marker, len) => {
          const index = searchMap[marker.dataOptions[propName]]
          if (index > -1) {
            list.splice(index - len, 1)
          }
        })
      } else {
        markers.forEach(marker => {
          const index = list.indexOf(marker)
          if (index > -1) {
            list.splice(index, 1)
          }
        })
      }
    },

    addMarkers(
      options,
      isItemIcon = false,
      isItemOffset = false,
      beforeCreate
    ) {
      if (!Array.isArray(options)) {
        warn('options is not an Array.')
        return
      }
      const propsOption = this.getPropsOptions()
      const map = this.getMapInstance(this.mid)
      const markerOptions = []

      let iconInstance = propsOption.icon
      let offsetInstance = propsOption.offset

      options.forEach((option, index) => {
        // 如果 icon 与 offset 是独立的，那么就为每一个 marker options 都创建一次
        if (isItemIcon && typeof iconInstance === 'object') {
          iconInstance = this.createIcon(iconInstance)
        }

        if (isItemOffset) {
          offsetInstance = this.$_amapMixin_createOffset(offsetInstance)
        }

        const mergeOption = {
          ...propsOption,
          ...option,
          icon: iconInstance,
          offset: offsetInstance
        }

        const markerOption = beforeCreate
          ? beforeCreate(mergeOption, index)
          : mergeOption

        const marker = this.createMarker(markerOption)
        markerOptions.push(marker)
      })
      map.add(markerOptions)
      this.markerInstanceList = this.markerInstanceList.concat(markerOptions)
    },

    handleOptionsChange() {
      this.getAMapPromise().then(() => {
        this.clearAll()
        const map = this.getMapInstance(this.mid)
        const options = this.getPolygonOptions()
        options.forEach(option => {
          const marker = this.createMarker(option)
          this.markerInstanceList.push(marker)
        })
        map.add(this.markerInstanceList)
      })
    },

    createIcon(icon) {
      const AMap = this.getAMapInstance()
      const { size, image, imageOffset, imageSize } = icon

      let sizeOption
      let imageSizeOption

      const imageOffsetOption = this.$_amapMixin_createOffset(
        imageOffset,
        'Icon imageOffset'
      )

      if (!size) {
        sizeOption = new AMap.Size(36, 36)
      } else if (!Array.isArray(size)) {
        warn('Icon size is not an Array, The default value will be taken here.')
        sizeOption = new AMap.Size(36, 36)
      } else {
        const [sizeX, sizeY] = size
        sizeOption = new AMap.Size(sizeX, sizeY)
      }

      if (Array.isArray(imageSize)) {
        const [sizeX, sizeY] = imageSize
        imageSizeOption = new AMap.Size(sizeX, sizeY)
      } else {
        warn('Icon imageSize is not an Array.')
      }

      const options = {
        size: sizeOption,
        imageOffset: imageOffsetOption,
        imageSize: imageSizeOption
      }

      const mergetOption = image ? { ...options, image } : options
      return new AMap.Icon(mergetOption)
    },

    createMarker(option) {
      const AMap = this.getAMapInstance()
      const marker = new AMap.Marker(cloneDeep(option))

      // 注册无法通过 $_amapMixin_addEvents 添加的事件
      marker.on('moveend', this.handleMoveendEvent)
      marker.on('movealong', this.handleMovealongEvent)

      this.$_amapMixin_addEvents(marker, events)
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
        isItemIcon,
        raiseOnDrag,
        topWhenClick,
        isItemOffset,
        autoRotation
      } = this

      let iconInstance = icon
      let offsetInstance = offset

      // 如果 icon 是一个对象，并且不是每个 marker 独立的配置
      // 那么就创建公共的 icon 实例
      if (typeof icon === 'object' && !isItemIcon) {
        iconInstance = this.createIcon(icon)
      }

      // 如果不是独立的 offset，就创建公共的 offset
      if (!isItemOffset) {
        offsetInstance = this.$_amapMixin_createOffset(offset)
      }

      return {
        icon: iconInstance,
        title,
        label,
        angle,
        shape,
        offset: offsetInstance,
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
      const { options, position, isItemIcon, isItemOffset, beforeCreate } = this

      const markerOptions = []

      const propsOptions = this.getPropsOptions()

      let iconInstance = propsOptions.icon
      let offsetInstance = propsOptions.offset

      options.forEach((option, index) => {
        // 如果 icon 与 offset 是独立的，那么就为每一个 marker options 都创建一次
        if (isItemIcon && typeof iconInstance === 'object') {
          iconInstance = this.createIcon(iconInstance)
        }

        if (isItemOffset) {
          offsetInstance = this.createIcon(offsetInstance)
        }

        const mergeOption = {
          ...propsOptions,
          position: position[index],
          ...option,
          icon: iconInstance,
          offset: offsetInstance
        }

        const markerOption = beforeCreate
          ? beforeCreate(mergeOption, index)
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
