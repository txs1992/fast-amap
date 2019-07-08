<template>
  <div ref="container" class="cpt-fast-map" :style="{ height: height + 'px' }">
    <div class="fast-map-slot-container">
      <slot v-if="mapLoaded"></slot>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'

import AMapMixin from '../../mixins/a-map'
import { noop } from '../../utils/utils'
import events from './events'

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

    options: {
      type: Object,
      default() {
        return {}
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
          this.setMapInstance(this.mid, map)
          events.forEach(evnetName => {
            map.on(evnetName, this.handleEvents)
          })
        }
      })
      .catch(noop)
  },

  destroyed() {
    const map = this.getMapInstance(this.mid)

    if (map) {
      events.forEach(evnetName => {
        map.off(evnetName, this.handleEvents)
      })
      this.deleteMapInstance(this.mid)
    }
  },

  methods: {
    handleEvents(event) {
      if (event.type === 'complete') {
        this.mapLoaded = true
      }
      this.$emit(event.type, event, this.getMapInstance(this.mid))
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

      // 数据与 vue 解绑
      return cloneDeep(mapOptions)
    }
  }
}
</script>

<style lang="scss">
.cpt-fast-map {
  position: relative;
  overflow: hidden;

  .fast-map-slot-container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 999;
    overflow: hidden;
    pointer-events: none;
  }
}
</style>
