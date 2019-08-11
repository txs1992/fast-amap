import AMapMixin from '../../mixins/a-map'

export default {
  name: 'FastInfoWindow',

  mixins: [AMapMixin],

  props: {
    size: Array,
    isCustom: Boolean,
    autoMove: Boolean,
    showShadow: Boolean,
    closeWhenClickMap: Boolean,

    anchor: {
      type: String,
      default: 'bottom-center'
    },

    offset: {
      type: Array,
      default() {
        return []
      }
    },

    content: {
      type: String,
      default: ''
    },

    position: {
      type: Array,
      default() {
        return []
      }
    },

    options: {
      type: Object,
      default() {
        return {}
      }
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
        const map = this.getMapInstance(this.mid)
        const options = this.getInstanceOptions()
        if (!this.content && this.$el) {
          options.content = this.$el
        }
        const instance = this.createInstance(options)
        this.instance = instance
        instance.open(map, this.position)
      })
    },

    getInfoWindowInstance() {
      return this.instance
    },

    createInstance(option) {
      const AMap = this.getAMapInstance()
      const instance = new AMap.InfoWindow(option)

      instance.on('open', this.handleOpenEvnet)
      instance.on('close', this.handleCloseEvnet)
      instance.on('change', this.handleChangeEvnet)

      instance.dataOptions = option
      return instance
    },

    handleOpenEvnet() {
      this.$emit('open')
    },

    handleCloseEvnet() {
      this.$emit('close')
    },

    handleChangeEvnet() {
      this.$emit('change')
    },

    getPropsOptions() {
      const {
        anchor,
        content,
        position,
        isCustom,
        autoMove,
        showShadow,
        closeWhenClickMap
      } = this

      return {
        anchor,
        content,
        position,
        isCustom,
        autoMove,
        showShadow,
        closeWhenClickMap
      }
    },

    getInstanceOptions(beforeOption) {
      const { size, offset, options, beforeCreate } = this
      const propsOptions = this.getPropsOptions()

      const mergeOption = {
        ...propsOptions,
        ...options
      }

      if (Array.isArray(size) && size.length) {
        const [sizeW, sizeH] = size
        const AMap = thie.getAMapInstance()
        const mapSize = new AMap.Size(sizeW, sizeH)
        mergeOption.size = mapSize
      }

      if (offset.length) {
        mergeOption.offset = this.$_amapMixin_createOffset(offset)
      }

      if (beforeOption) beforeOption(mergeOption)

      return beforeCreate ? beforeCreate(mergeOption, index) : mergeOption
    },

    clearAll() {
      const instance = this.instance
      if (instance) {
        instance.on('open', this.handleOpenEvnet)
        instance.on('close', this.handleCloseEvnet)
        instance.on('change', this.handleChangeEvnet)
        this.instance = null
      }

      const map = this.getMapInstance()
      map.clearInfoWindow()
    },

    open(ps) {
      const { instance, position } = this
      if (instance) {
        const map = this.getMapInstance()
        instance.open(map, Array.isArray[ps] ? ps : position)
      }
    },

    close() {
      const { instance } = this
      if (instance) instance.close()
    }
  },

  render(h) {
    return this.content
      ? null
      : h(
          'div',
          {
            class: 'info-widnow-container'
          },
          [this.$slots.default]
        )
  }
}
