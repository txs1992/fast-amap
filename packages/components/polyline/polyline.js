// import events from '../polygons/events'
import AMapMixin from '../../mixins/a-map'
import PolyPropMixin from '../../mixins/poly-prop'

export default {
  name: 'FastPolyline',

  mixins: [AMapMixin, PolyPropMixin],

  props: {
    beforeCreatePolygon: Function,
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
    },

    options: {
      type: Array,
      default() {
        return []
      }
    }
  },

  render() {
    return null
  }
}
