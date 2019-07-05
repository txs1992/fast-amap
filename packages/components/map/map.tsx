{
  /* <template>
  <div ref="container" class="cpt-fast-map" :style="{ height: height + 'px' }">
    <div class="fast-map-slot-container">
      <slot v-if="mapLoaded"></slot>
    </div>
  </div>
</template> */
}
import "packages/styles/index.scss";
import cloneDeep from "lodash.clonedeep";
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";

import AMapMixin from "packages/mixins/a-map";
import { noop } from "packages/utils/utils";

import events from "./events";

@Component
export default class FastMap extends Mixins(AMapMixin) {
  public name: string;
  private mapLoaded: boolean;

  constructor(props: any) {
    super(props);
    this.name = "FastMap";
    this.mapLoaded = false;
  }

  /* 高德地图 Map 类设置参数 */
  @Prop() private view!: any;
  @Prop(Number) private zoom!: number;
  @Prop() private center!: any;
  @Prop(Number) private labelzIndex!: number;
  @Prop({ type: String, default: "zh_cn" }) private lang!: string;
  @Prop(String) private defaultCursor!: string;
  @Prop(String) private crs!: string;
  @Prop({ type: Boolean, default: true }) private animateEnable!: boolean;
  @Prop({ type: Boolean, default: true }) private isHotspot!: boolean;
  @Prop(Boolean) private rotateEnable!: boolean;
  @Prop(Boolean) private resizeEnable!: boolean;
  @Prop({ type: Boolean, default: true }) private showIndoorMap!: boolean;
  @Prop() private indoorMap!: any;
  @Prop() private defaultLayer: any;
  @Prop(Boolean) private expandZoomRange!: boolean;
  @Prop({ type: Boolean, default: true }) private dragEnable!: boolean;
  @Prop({ type: Boolean, default: true }) private zoomEnable!: boolean;
  @Prop({ type: Boolean, default: true }) private doubleClickZoom!: boolean;
  @Prop({ type: Boolean, default: true }) private keyboardEnable!: boolean;
  @Prop({ type: Boolean, default: true }) private jogEnable!: boolean;
  @Prop({ type: Boolean, default: true }) private scrollWheel!: boolean;
  @Prop({ type: Boolean, default: true }) private touchZoom!: boolean;
  @Prop(Number) private touchZoomCenter!: number;
  @Prop(String) private mapStyle!: string;
  @Prop(Array) private features!: Array<any>;
  @Prop(Boolean) private showBuildingBlock!: boolean;
  @Prop({ type: String, default: "2D" }) private viewMode!: string;
  @Prop({ type: Number, default: 0 }) private pitch!: number;
  @Prop(Boolean) private pitchEnable!: boolean;
  @Prop({ type: Boolean, default: true }) private buildingAnimation!: boolean;
  @Prop(String) private skyColor!: string;
  @Prop(Array) private mask!: Array<any>;

  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  private layers!: Array<any>;

  @Prop({
    type: Array,
    default() {
      return [3, 18];
    }
  })
  private zooms!: Array<number>;

  /* 自定义参数 */
  @Prop({ default: 600 }) private height!: number | string;

  @Prop({
    default() {
      return {};
    }
  })
  private options!: any;

  public mounted(): void {
    this.getAMap()
      .then(AMap => {
        const options = this.createMapOptions();
        let map: any;

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
  }

  public createMapOptions(): any {
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

    return cloneDeep(mapOptions);
  }

  public beforeDestroy(): void {
    const map = this.getMapInstance(this.mid);
    if (map) {
      events.forEach(evnetName => {
        map.off(evnetName, this.handleEvents);
      });
    }
  }

  public destroyed(): void {
    if (this.getMapInstance(this.mid)) {
      this.deleteMapInstance(this.mid);
    }
  }

  public handleEvents(event: any): void {
    if (event.type === "complete") {
      this.mapLoaded = true;
    }
    this.$emit(event.type, event, this.getMapInstance(this.mid));
  }

  public render() {
    return (
      <div
        ref="container"
        class="cpt-fast-map"
        style={{ height: this.height + "px" }}
      >
        <div class="fast-map-slot-container">
          {this.mapLoaded ? this.$slots.default : null}
        </div>
      </div>
    );
  }
}
