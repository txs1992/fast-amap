import events from '../polygons/events'
import AMapMixin from '../../mixins/a-map'
import PolyPropMixin from '../../mixins/poly-prop'

export default {
  name: 'FastBezierCurve',

  mixins: [AMapMixin, PolyPropMixin],

  props: {
    showDir: Boolean,
    isOutline: Boolean,
    outlineColor: String,
    borderWeight: Number
  },

  watch: {
    options: {
      immediate: true,
      handler: '$_amapMixin_handleOptionsChange'
    }
  },

  methods: {
    handleChangeEvnet() {
      this.$emit('change')
    },

    removeChangeEvents(instances) {
      instances.forEach(instance => {
        instance.off('change', this.handleChangeEvnet)
      })
    },

    removeBezierCurves(instances, propName) {
      this.$_amapMixin_removeInstances(
        'bezierCurves',
        events,
        instances,
        propName,
        () => {
          this.removeChangeEvents(instances)
        }
      )
    },

    createInstance(option) {
      const AMap = this.getAMapInstance()
      const instance = new AMap.BezierCurve(option)

      // 添加 $_amapMixin_addEvents 无法注册的事件
      instance.on('change', this.handleChangeEvnet)
      this.$_amapMixin_addEvents(instance, events)
      instance.dataOptions = option
      return instance
    },

    addBezierCurves(options, beforeCreate) {
      this.$_amapMixin_addInstances(options, beforeCreate)
    },

    clearAll() {
      this.$_amapMixin_clearAll('bezierCurve', events, instances => {
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
        draggable,
        isOutline,
        strokeColor,
        strokeStyle,
        strokeWeight,
        outlineColor,
        borderWeight,
        strokeOpacity,
        strokeDasharray
      } = this

      return {
        cursor,
        bubble,
        zIndex,
        extData,
        showDir,
        draggable,
        isOutline,
        strokeColor,
        strokeStyle,
        strokeWeight,
        outlineColor,
        borderWeight,
        strokeOpacity,
        strokeDasharray
      }
    },

    getInstanceOptions() {
      return this.$_amapMixin_getInstanceOptions()
    }
  }
}
