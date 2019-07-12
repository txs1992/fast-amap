import cloneDeep from 'lodash.clonedeep'

import { warn } from '../../utils/utils'
import events from './events'
import AMapMixin from '../../mixins/a-map'

export default {
  name: 'FastText',

  mixins: [AMapMixin],

  props: {
    text: String,
    title: String,
    angle: Number,
    cursor: String,
    shadow: Object,
    bubble: Boolean,
    extData: null,
    draggable: Boolean,
    clickable: Boolean,
    raiseOnDrag: Boolean,
    styleOption: Object,
    topWhenClick: Boolean,
    autoRotation: Boolean,
    isItemOffset: Boolean,
    beforeCreatePolygon: Function,

    anchor: {
      type: String,
      default: 'center'
    },

    offset: {
      type: Array,
      default() {
        return []
      }
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
    // 由于需要将高德地图与 vue 解耦，所以这里创建的 text 数组不能被 vue watch。
    if (!this.textInstanceList) {
      this.textInstanceList = []
    }
  },

  methods: {
    handleOptionsChange() {
      this.getAMapPromise().then(() => {
        this.clearAll()
        const map = this.getMapInstance(this.mid)
        const options = this.getPolygonOptions()
        options.forEach(option => {
          const text = this.createText(option)
          this.textInstanceList.push(text)
        })
        map.add(this.textInstanceList)
      })
    },

    getAllTexts() {
      return this.textInstanceList.slice(0)
    },

    showAll() {
      this.textInstanceList.forEach(text => text.show())
    },

    hideAll() {
      this.textInstanceList.forEach(text => text.hide())
    },

    handleMoveendEvent() {
      this.$emit('moveend')
    },

    handleMovealongEvent() {
      this.$emit('movealong')
    },

    getTextByProp(propName, propValue) {
      return this.textInstanceList.find(
        it => it.dataOptions[propName] === propValue
      )
    },

    getTextByProps(propName, propValues) {
      if (!Array.isArray(propValues)) {
        warn('propValues is an array.')
        return
      }

      const searchMap = {}
      this.textInstanceList.forEach(instance => {
        const data = instance.dataOptions
        searchMap[data[propName]] = instance
      })

      const searchList = []
      propValues.forEach(v => {
        if (searchMap[v]) searchList.push(searchMap[v])
      })
      return searchList
    },

    addTexts(options, isItemOffset = false, beforeCreatePolygon) {
      if (!Array.isArray(options)) {
        warn('options is not an Array.')
        return
      }
      const propsOption = this.getPropsOptions()
      const map = this.getMapInstance(this.mid)
      const textOptions = []
      let offsetInstance = propsOption.offset

      options.forEach((option, index) => {
        // 如果 offset 是独立的，那么就为每一个 text options 都创建一次
        if (isItemOffset) {
          offsetInstance = this.$_amapMixin_createOffset(offsetInstance)
        }

        const mergeOption = {
          ...propsOption,
          ...option,
          offset: offsetInstance
        }

        mergeOption.style = mergeOption.styleOption

        const textOption = beforeCreatePolygon
          ? beforeCreatePolygon(mergeOption, index)
          : mergeOption

        const text = this.createText(textOption)
        textOptions.push(text)
      })
      map.add(textOptions)
      this.textInstanceList = this.textInstanceList.concat(textOptions)
    },

    removeTexts(texts, propName) {
      if (!Array.isArray(texts)) {
        warn('texts is not an Array.')
        return
      }

      const { mid, textInstanceList: list } = this
      const map = this.getMapInstance(mid)

      this.$_amapMixin_removeEvents(texts, events, 'texts')
      this.removeNotEvnetObjectEvnets(texts)

      map.remove(texts)

      if (propName) {
        const searchMap = {}

        list.forEach((item, index) => {
          searchMap[item.dataOptions[propName]] = index
        })

        texts.forEach((text, len) => {
          const index = searchMap[text.dataOptions[propName]]
          if (index > -1) {
            list.splice(index - len, 1)
          }
        })
      } else {
        texts.forEach(text => {
          const index = list.indexOf(text)
          if (index > -1) {
            list.splice(index, 1)
          }
        })
      }
    },

    clearAll() {
      const { mid, textInstanceList: texts } = this
      const map = this.getMapInstance(mid)
      this.$_amapMixin_removeEvents(texts, events, 'texts')

      // 删除无法通过 $_amapMixin_addEvents 注册的事件。
      this.removeNotEvnetObjectEvnets(texts)
      console.log(texts)
      map.remove(texts)
      this.textInstanceList = []
    },

    createText(option) {
      const AMap = this.getAMapInstance()
      const text = new AMap.Text(cloneDeep(option))

      // 注册无法通过 $_amapMixin_addEvents 添加的事件
      text.on('moveend', this.handleMoveendEvent)
      text.on('movealong', this.handleMovealongEvent)

      this.$_amapMixin_addEvents(text, events)
      text.dataOptions = option
      return text
    },

    getPropsOptions() {
      const {
        text,
        title,
        angle,
        anchor,
        cursor,
        offset,
        shadow,
        bubble,
        zIndex,
        visible,
        extData,
        options,
        position,
        draggable,
        clickable,
        animation,
        styleOption,
        raiseOnDrag,
        topWhenClick,
        autoRotation,
        isItemOffset
      } = this

      let offsetInstance = offset

      // 如果不是独立的 offset，就创建公共的 offset
      if (!isItemOffset) {
        offsetInstance = this.$_amapMixin_createOffset(offset)
      }

      return {
        text,
        title,
        angle,
        anchor,
        cursor,
        offset: offsetInstance,
        shadow,
        bubble,
        zIndex,
        visible,
        extData,
        options,
        position,
        draggable,
        clickable,
        animation,
        styleOption,
        raiseOnDrag,
        topWhenClick,
        autoRotation
      }
    },

    getPolygonOptions() {
      const { options, position, isItemOffset, beforeCreatePolygon } = this

      const textOptions = []

      const propsOptions = this.getPropsOptions()

      let offsetInstance = propsOptions.offset

      options.forEach((option, index) => {
        // 如果 offset 是独立的，那么就为每一个 text options 都创建一次
        if (isItemOffset) {
          offsetInstance = this.$_amapMixin_createOffset(offsetInstance)
        }

        const mergeOption = {
          ...propsOptions,
          position: position[index],
          ...option,
          offset: offsetInstance
        }

        mergeOption.style = mergeOption.styleOption

        const textOption = beforeCreatePolygon
          ? beforeCreatePolygon(mergeOption, index)
          : mergeOption

        textOptions.push(cloneDeep(textOption))
      })

      return textOptions
    },

    removeNotEvnetObjectEvnets(texts) {
      // 删除无法通过 $_amapMixin_addEvents 注册的事件。
      texts.forEach(text => {
        text.off('moveend', this.handleMoveendEvent)
        text.off('movealong', this.handleMovealongEvent)
      })
    }
  },

  render() {
    return null
  }
}
