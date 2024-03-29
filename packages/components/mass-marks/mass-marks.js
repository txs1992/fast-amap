import events from './events'
import AMapMixin from '../../mixins/a-map'

export default {
  name: 'FastMassMarks',

  mixins: [AMapMixin],

  props: {
    cursor: String,
    opacity: Number,

    data: {
      type: Array,
      default() {
        return []
      }
    },

    zooms: {
      type: Array,
      default() {
        return [3, 18]
      }
    },

    zIndex: {
      type: Number,
      default: 5
    },

    options: {
      type: Object,
      default() {
        return {}
      }
    },

    styleOption: {
      type: [Object, Array],
      default() {
        return {}
      }
    },

    alwaysRender: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    options: {
      immediate: true,
      handler: 'handleOptionsChange'
    },

    data: 'handleDataChange'
  },

  methods: {
    handleOptionsChange(options) {
      this.getAMapPromise().then(() => {
        const map = this.getMapInstance(this.mid)
        const options = this.getInstanceOptions()
        const instance = this.createInstance(options)
        this.instance = instance
        this.$_amapMixin_addEvents(instance, events)
        instance.setMap(map)
      })
    },

    handleDataChange(data) {
      if (this.instance) {
        this.instance.clear();
        this.instance.setData(data)
      }
    },

    clearAll() {
      this.$_amapMixin_removeEvents([this.instance], events, this.name)
      const map = this.getMapInstance(this.mid)
      map.remove(this.instance)
      this.instance = null
    },

    createInstance(option) {
      const AMap = this.getAMapInstance()
      const instance = new AMap.MassMarks(this.data, option)

      instance.dataOptions = option
      return instance
    },

    getPropsOptions() {
      const { zooms, cursor, opacity, zIndex, styleOption, alwaysRender } = this

      return {
        zooms,
        cursor,
        opacity,
        zIndex,
        styleOption,
        alwaysRender
      }
    },

    getMassMarksInstance() {
      return this.instance
    },

    getInstanceOptions(beforeOption) {
      const { options, beforeCreate } = this
      const propsOptions = this.getPropsOptions()

      const mergeOption = {
        ...propsOptions,
        ...options
      }

      if (Array.isArray(mergeOption.styleOption)) {
        mergeOption.style = mergeOption.style.map(item =>
          this.formatStyleOptions(item)
        )
      } else {
        mergeOption.style = this.formatStyleOptions(mergeOption.styleOption)
      }

      if (beforeOption) beforeOption(mergeOption)

      return beforeCreate ? beforeCreate(mergeOption) : mergeOption
    },

    formatStyleOptions(option) {
      const { size, anchor } = option
      const style = { ...option }

      if (Array.isArray(size) && size.length) {
        const [sizeW, sizeH] = size
        const AMap = this.getAMapInstance()
        const mapSize = new AMap.Size(sizeW, sizeH)
        style.size = mapSize
      }

      if (Array.isArray(anchor) && anchor.length) {
        const [x, y] = size
        const AMap = this.getAMapInstance()
        const mapPixel = new AMap.Pixel(x, y)
        style.anchor = mapPixel
      }

      return style
    }
  }
}
