(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash.clonedeep')) :
  typeof define === 'function' && define.amd ? define(['lodash.clonedeep'], factory) :
  (global = global || self, global.FastAMap = factory(global.cloneDeep));
}(this, function (cloneDeep) { 'use strict';

  cloneDeep = cloneDeep && cloneDeep.hasOwnProperty('default') ? cloneDeep['default'] : cloneDeep;

  function warn(msg) {
    console.error(`[FastAMap warn]: ${msg}`);
  }

  function noop() {}

  class AMapOptions {
    constructor() {
      this.options = null;
    }

    getOptions() {
      return this.options
    }

    setOptions(options) {
      this.options = options;
    }

    static getOptionsInstance() {
      if (!this.options) {
        this.options = new AMapOptions();
      }

      return this.options
    }
  }

  let AMap = null;
  const defaultPath = 'https://webapi.amap.com/maps';
  const mapOptions = AMapOptions.getOptionsInstance();

  /**
   * 地图加载器
   * @param key
   * @param version
   * @param url
   */
  function mapLoader(key, version, url) {
    return new Promise((reslove, reject) => {
      if (AMap) {
        return reslove(AMap)
      }

      if (!url && (!key || !version)) {
        warn(
          'The parameter is incorrect and must contain the url attribute or the key and version attributes.'
        );
      }

      const aMapUrl = url ? url : `${defaultPath}?v=${version}&key=${key}`;

      const jsApi = document.createElement('script');
      jsApi.charset = 'utf-8';
      jsApi.src = aMapUrl;
      jsApi.onerror = reject;
      jsApi.onload = () => {
        if (window.AMap) {
          AMap = window.AMap;
          reslove(AMap);
        } else {
          warn('AMap SDK Load Failure.');
        }
      };

      document.head.appendChild(jsApi);
    })
  }

  function mapOptionLoader() {
    const option = mapOptions.getOptions() || {};
    return mapLoader(option.key, option.version, option.url)
  }

  /**
   * 高德地图实例注册表
   */
  class MapRegistry {
    constructor() {
      this.registry = null;
    }

    setMap(mid, instance) {
      if (!mid) {
        warn('The parameter mid cannot be empty');
      }
      if (this.map) {
        if (this.map.get(mid)) {
          warn(`mid: ${mid} already exists in the map registry`);
        } else {
          this.map.set(mid, instance);
        }
      }
    }

    getMap(mid) {
      return this.map && this.map.get(mid)
    }

    deleteMap(mid) {
      if (this.getMap(mid)) {
        this.map.delete(mid);
      } else {
        warn(`No instance of mid: ${mid} found in the map registry`);
      }
    }

    static getRegistryInstance() {
      if (!this.registry) {
        this.registry = new MapRegistry();
        this.registry.map = new Map();
      }

      return this.registry
    }
  }

  const registry = MapRegistry.getRegistryInstance();

  var AMapMixin = {
    props: {
      mid: {
        type: [String, Number],
        required: true
      }
    },

    methods: {
      getAMap() {
        // return promise
        return mapOptionLoader()
      },

      getMapInstance(mid) {
        return registry.getMap(mid ? mid : this.mid)
      },

      setMapInstance(mid, instance) {
        registry.setMap(mid, instance);
      },

      deleteMapInstance(mid) {
        registry.deleteMap(mid);
      }
    }
  };

  var events = [
    'complete',
    'click',
    'dblclick',
    'mapmove',
    'hotspotclick',
    'hotspotover',
    'hotspotout',
    'movestart',
    'moveend',
    'zoomchange',
    'zoomstart',
    'zoomend',
    'mousemove',
    'mousewheel',
    'mouseover',
    'mouseout',
    'mouseup',
    'mousedown',
    'rightclick',
    'dragstart',
    'dragging',
    'dragend',
    'resize',
    'touchstart',
    'touchmove',
    'touchend'
  ];

  var FastMap = {
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
      this.getAMap()
        .then(AMap => {
          let map = null;
          const options = this.createMapOptions();

          try {
            map = new AMap.Map(this.$refs.container, options);
          } catch (e) {
            console.error(e);
          }

          if (map) {
            this.setMapInstance(this.mid, map);
            events.forEach(evnetName => {
              map.on(evnetName, this.handleEvents);
            });
          }
        })
        .catch(noop);
    },

    destroyed() {
      const map = this.getMapInstance(this.mid);

      if (map) {
        events.forEach(evnetName => {
          map.off(evnetName, this.handleEvents);
        });
        this.deleteMapInstance(this.mid);
      }
    },

    methods: {
      handleEvents(event) {
        if (event.type === 'complete') {
          this.mapLoaded = true;
        }
        this.$emit(event.type, event, this.getMapInstance(this.mid));
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
        } = this;

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
        };

        // 一些默值是 undefined 会对 Map 类产生影响的参数。
        if (labelzIndex != null) {
          mapOptions.labelzIndex = labelzIndex;
        }

        if (Array.isArray(features)) {
          mapOptions.features = features;
        }

        if (defaultLayer) {
          mapOptions.defaultLayer = defaultLayer;
        }

        // 数据与 vue 解绑
        return cloneDeep(mapOptions)
      }
    }
  };

  FastMap.install = function(Vue) {
    Vue.component(FastMap.name, FastMap);
  };

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".cpt-fast-map {\n  position: relative;\n  overflow: hidden; }\n  .cpt-fast-map .fast-map-slot-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    z-index: 999;\n    overflow: hidden;\n    pointer-events: none; }\n";
  styleInject(css);

  var events$1 = [
    'click',
    'dblclick',
    'rightclick',
    'hide',
    'show',
    'mousedown',
    'mouseup',
    'mouseover',
    'mouseout',
    'change',
    'touchstart',
    'touchmove',
    'touchend'
  ];

  var AMapPropMixin = {
    props: {
      extData: null,
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
  };

  var FastPolygon = {
    name: 'FastPolygon',

    mixins: [AMapMixin, AMapPropMixin],

    props: {
      beforeCreatePolygon: Function,

      options: {
        type: Array,
        default() {
          return []
        }
      },

      fillColor: {
        type: String,
        default: '#FFAAA00'
      },

      fillOpacity: {
        type: Number,
        default: 0.9
      }
    },

    watch: {
      options: {
        deep: true,
        immediate: true,
        handler: 'handlePolygonsChange'
      }
    },

    created() {
      // 由于需要将高德地图与 vue 解耦，所以这里创建的 polygon 数组不能被 vue watch。
      if (!this.polygonInstanceList) {
        this.polygonInstanceList = [];
      }
    },

    beforeDestroy() {
      this.removeEvents();
    },

    methods: {
      handleEvents(event) {
        this.$emit(event.type, event, this.getMapInstance(this.mid));
      },

      removeEvents() {
        const map = this.getMapInstance(this.mid);
        const { polygonInstanceList } = this;
        if (polygonInstanceList && polygonInstanceList.length) {
          polygonInstanceList.forEach(instance => {
            events$1.forEach(evnet => {
              instance.off(evnet, this.handleEvents);
            });
          });
          map.remove(polygonInstanceList);
          this.polygonInstanceList = [];
        }
      },

      handlePolygonsChange() {
        this.getAMap().then(AMap => {
          const map = this.getMapInstance(this.mid);
          // 如果已经有 polygon 实例，清除所有实例
          this.removeEvents();
          const options = this.getPolygonOptions();
          options.forEach(option => {
            const polygon = new AMap.Polygon({ ...option, map });
            events$1.forEach(evnet => {
              polygon.on(evnet, this.handleEvents);
            });
            polygon.dataOptions = option;
            this.polygonInstanceList.push(polygon);
          });
        });
      },

      getPolygonOptions() {
        const {
          path,
          bubble,
          zIndex,
          extData,
          options,
          draggable,
          fillColor,
          fillOpacity,
          strokeColor,
          strokeStyle,
          strokeWeight,
          strokeOpacity,
          strokeDasharray,
          beforeCreatePolygon
        } = this;

        const polygonOptions = [];
        options.forEach((option, index) => {
          const mergeOption = {
            path: path[index],
            bubble,
            zIndex,
            extData,
            draggable,
            fillColor,
            fillOpacity,
            strokeColor,
            strokeStyle,
            strokeWeight,
            strokeOpacity,
            strokeDasharray,
            ...option
          };

          const polygonOption = beforeCreatePolygon
            ? beforeCreatePolygon(mergeOption, index)
            : mergeOption;

          polygonOptions.push(cloneDeep(polygonOption));
        });

        return polygonOptions
      }
    },

    render() {
      return null
    }
  };

  FastPolygon.install = function(Vue) {
    Vue.component(FastPolygon.name, FastPolygon);
  };

  function install(Vue) {
  [FastMap, FastPolygon].forEach(cpt => cpt.install(Vue));
  }

  const registry$1 = MapRegistry.getRegistryInstance();

  const mapOptions$1 = AMapOptions.getOptionsInstance();

  var index = { install, registry: registry$1, mapOptions: mapOptions$1, mapLoader, mapOptionLoader };

  return index;

}));
