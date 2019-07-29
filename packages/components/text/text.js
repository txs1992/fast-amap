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

  methods: {
    handleOptionsChange() {
      this.getAMapPromise().then(() => {
        this.clearAll()
        const map = this.getMapInstance(this.mid)
        const options = this.getPolygonOptions()
        options.forEach(option => {
          const text = this.createText(option)
          this.instanceList.push(text)
        })
        map.add(this.instanceList)
      })
    },

    handleMoveendEvent() {
      this.$emit('moveend')
    },

    handleMovealongEvent() {
      this.$emit('movealong')
    },

    addTexts(options, isItemOffset = false, beforeCreate) {
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

        const textOption = beforeCreate
          ? beforeCreate(mergeOption, index)
          : mergeOption

        const text = this.createText(textOption)
        textOptions.push(text)
      })
      map.add(textOptions)
      this.instanceList = this.instanceList.concat(textOptions)
    },

    removeTexts(texts, propName) {
      this.$_amapMixin_removeInstances('texts', events, texts, propName, () => {
        this.removeNotEvnetObjectEvnets(texts)
      })
    },

    clearAll() {
      this.$_amapMixin_clearAll('texts', events, instances => {
        this.removeNotEvnetObjectEvnets(instances)
      })
    },

    createText(option) {
      const AMap = this.getAMapInstance()
      const text = new AMap.Text(option)

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
      const { options, position, isItemOffset, beforeCreate } = this

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

        const textOption = beforeCreate
          ? beforeCreate(mergeOption, index)
          : mergeOption

        textOptions.push(textOption)
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
  }
}
