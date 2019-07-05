export default {
  props: {
    extData,
    bubble: Boolean,
    draggable: Boolean,
    strokeWeight: Number,

    zIndex: {
      type: Number,
      default: 10
    },

    strokeStyle: {
      type: String,
      default: 'solid'
    },

    strokeColor: {
      type: String,
      default: '#006600'
    },

    strokeOpacity: {
      type: Number,
      default: 0.9
    },

    path: {
      type: Array,
      default() {
        return []
      }
    },

    strokeDasharray: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
