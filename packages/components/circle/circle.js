import events from '../polygons/events'
import AMapMixin from '../../mixins/a-map'
import PolyPropMixin from '../../mixins/poly-prop'

const circleEvents = events.concat('change')

export default {
  name: 'FastCircle',

  mixins: [AMapMixin, PolyPropMixin],

  props: {
    radius: Number,
    fillColor: String,
    fillOpacity: Number,

    center: {
      type: Array,
      default() {
        return []
      }
    }
  },

  watch: {
    options: {
      immediate: true,
      handler: '$_amapMixin_handleOptionsChange'
    }
  },

  methods: {
    removeCircles(instances, propName) {
      this.$_amapMixin_removeInstances(
        'circles',
        circleEvents,
        instances,
        propName
      )
    },

    createInstance(option) {
      const AMap = this.getAMapInstance()
      const instance = new AMap.Circle(option)
      this.$_amapMixin_addEvents(instance, circleEvents)
      instance.dataOptions = option
      return instance
    },

    addCircles(options, beforeCreate) {
      this.$_amapMixin_addInstances(options, beforeCreate)
    },

    clearAll() {
      this.$_amapMixin_clearAll('circle', circleEvents)
    },

    getPropsOptions() {
      const {
        radius,
        cursor,
        bubble,
        zIndex,
        center,
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
        radius,
        cursor,
        bubble,
        zIndex,
        center,
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

    getInstanceOptions() {
      return this.$_amapMixin_getInstanceOptions(option => {
        const AMap = this.getAMapInstance()
        const [lng, lat] = option.center
        option.center = new AMap.LngLat(lng, lat)
      })
    }
  }
}
