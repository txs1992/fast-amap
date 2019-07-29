import AMapMixin from '../../mixins/a-map'
import { noop } from '../../utils/utils'
import events from './events'
import '../../styles/map.scss'

export default {
  name: 'FastMap',

  mixins: [AMapMixin],

  props: {
    view: null,
    center: null,
    indoorMap: null,
    defaultLayer: null,

    crs: String,
    mask: Array,
    zoom: Number,
    skyColor: String,
    mapStyle: String,
    features: Array,
    labelzIndex: Number,
    pitchEnable: Boolean,
    defaultCursor: String,
    rotateEnable: Boolean,
    resizeEnable: Boolean,
    touchZoomCenter: Number,
    expandZoomRange: Boolean,
    showBuildingBlock: Boolean,

    lang: {
      type: String,
      default: 'zh_cn'
    },

    zooms: {
      type: Array,
      default() {
        return [3, 18]
      }
    },

    pitch: {
      type: Number,
      default: 0
    },

    height: {
      type: Number,
      default: 600
    },

    layers: {
      type: Array,
      default() {
        return []
      }
    },

    viewMode: {
      type: String,
      default: '2D'
    },

    touchZoom: {
      type: Boolean,
      default: true
    },

    isHotspot: {
      type: Boolean,
      default: true
    },

    jogEnable: {
      type: Boolean,
      default: true
    },

    dragEnable: {
      type: Boolean,
      default: true
    },

    zoomEnable: {
      type: Boolean,
      default: true
    },

    scrollWheel: {
      type: Boolean,
      default: true
    },

    animateEnable: {
      type: Boolean,
      default: true
    },

    showIndoorMap: {
      type: Boolean,
      default: true
    },

    keyboardEnable: {
      type: Boolean,
      default: true
    },

    doubleClickZoom: {
      type: Boolean,
      default: true
    },

    buildingAnimation: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      mapLoaded: false
    }
  },

  mounted() {
    this.getAMapPromise()
      .then(AMap => {
        let map = null
        const options = this.createMapOptions()

        try {
          map = new AMap.Map(this.$refs.container, options)
        } catch (e) {
          console.error(e)
        }

        if (map) {
          this.$_amapMixin_setMapInstance(this.mid, map)
          map.on('mapmove', this.handleMapmoveEvent)
          map.on('complete', this.handleCompleteEvent)
          map.on('movestart', this.handleMovestartEvent)
          map.on('moveend', this.handleMoveendEvent)
          map.on('zoomchange', this.handleZoomchangeEvent)
          map.on('zoomstart', this.handleZoomstartEvent)
          map.on('zoomend', this.handleZoomendEvent)
          map.on('dragstart', this.handleDragstartEvent)
          map.on('dragging', this.handleDraggingEvent)
          map.on('dragend', this.handleDragendEvent)
          map.on('resize', this.handleResizeEvent)

          this.$_amapMixin_addEvents(map, events)
        }
      })
      .catch(noop)
  },

  destroyed() {
    const map = this.getMapInstance(this.mid)

    if (map) {
      map.off('mapmove', this.handleMapmoveEvent)
      map.off('complete', this.handleCompleteEvent)
      map.off('movestart', this.handleMovestartEvent)
      map.off('moveend', this.handleMoveendEvent)
      map.off('zoomchange', this.handleZoomchangeEvent)
      map.off('zoomstart', this.handleZoomstartEvent)
      map.off('zoomend', this.handleZoomendEvent)
      map.off('dragstart', this.handleDragstartEvent)
      map.off('dragging', this.handleDraggingEvent)
      map.off('dragend', this.handleDragendEvent)
      map.off('resize', this.handleResizeEvent)

      this.$_amapMixin_removeEvents([map], events, 'map')
      this.$_amapMixin_deleteMapInstance(this.mid)
    }
  },

  methods: {
    handleCompleteEvent(event) {
      this.mapLoaded = true
      this.$emit(event.type, event, this.getMapInstance(this.mid))
    },

    handleMapmoveEvent() {
      this.$emit('mapmove')
    },

    handleMovestartEvent() {
      this.$emit('movestart')
    },

    handleMoveendEvent() {
      this.$emit('moveend')
    },

    handleZoomchangeEvent() {
      this.$emit('zoomchange')
    },

    handleZoomstartEvent() {
      this.$emit('zoomstart')
    },

    handleZoomendEvent() {
      this.$emit('zoomend')
    },

    handleDragstartEvent() {
      this.$emit('dragstart')
    },

    handleDraggingEvent() {
      this.$emit('dragging')
    },

    handleDragendEvent() {
      this.$emit('dragend')
    },

    handleResizeEvent() {
      this.$emit('resize')
    },

    createMapOptions() {
      const {
        crs,
        mask,
        view,
        lang,
        zoom,
        zooms,
        pitch,
        center,
        layers,
        options,
        skyColor,
        viewMode,
        mapStyle,
        features,
        touchZoom,
        jogEnable,
        isHotspot,
        indoorMap,
        dragEnable,
        zoomEnable,
        pitchEnable,
        labelzIndex,
        scrollWheel,
        defaultLayer,
        rotateEnable,
        resizeEnable,
        defaultCursor,
        animateEnable,
        showIndoorMap,
        keyboardEnable,
        expandZoomRange,
        doubleClickZoom,
        touchZoomCenter,
        showBuildingBlock,
        buildingAnimation
      } = this

      const mapOptions = {
        crs,
        mask,
        view,
        lang,
        zoom,
        zooms,
        pitch,
        center,
        layers,
        skyColor,
        viewMode,
        mapStyle,
        touchZoom,
        jogEnable,
        isHotspot,
        indoorMap,
        dragEnable,
        zoomEnable,
        pitchEnable,
        scrollWheel,
        rotateEnable,
        resizeEnable,
        defaultCursor,
        animateEnable,
        showIndoorMap,
        keyboardEnable,
        expandZoomRange,
        doubleClickZoom,
        touchZoomCenter,
        showBuildingBlock,
        buildingAnimation,
        ...options
      }

      // 一些默值是 undefined 会对 Map 类产生影响的参数。
      if (labelzIndex != null) {
        mapOptions.labelzIndex = labelzIndex
      }

      if (Array.isArray(features)) {
        mapOptions.features = features
      }

      if (defaultLayer) {
        mapOptions.defaultLayer = defaultLayer
      }

      return mapOptions
    }
  },

  render(h) {
    // 渲染模型
    // <div ref="container" class="cpt-fast-map" :style="{ height: height + 'px' }">
    //   <div class="fast-map-slot-container">
    //     <slot v-if="mapLoaded"></slot>
    //   </div>
    // </div>

    const slots = this.mapLoaded ? this.$slots.default : null
    return h(
      'div',
      {
        ref: 'container',
        class: 'cpt-fast-map',
        style: { height: `${this.height}px` }
      },
      [
        h(
          'div',
          {
            class: 'fast-map-slot-container'
          },
          [slots]
        )
      ]
    )
  }
}
