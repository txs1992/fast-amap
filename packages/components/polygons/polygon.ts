import cloneDeep from "lodash.clonedeep";
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator";

import { noop } from "packages/utils/utils";
import events from "./events";
import AMapMixin from "packages/mixins/a-map";
import AMapPropMixin from "packages/mixins/poly-prop";

@Component
export default class FastPolygon extends Mixins(AMapMixin, AMapPropMixin) {
  public name: string;

  constructor(props: any) {
    super(props);
    this.name = "FastPolygon";
  }

  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  options!: Array<any>;

  @Prop(Function) beforeCreatePolygon!: Function;
  @Prop({ type: String, default: "#FFAAA00" }) fillColor!: string;
  @Prop({ type: Number, default: 0.9 }) fillOpacity!: number;

  public beforeDestroy(): void {
    this.removeEvents();
  }

  @Watch("options", { immediate: true, deep: true })
  handlePolygonsChange(): void {
    // 由于需要将高德地图与 vue 解耦，所以这里创建的 polygon 数组不能被 vue watch。
    if (!this.polygonInstanceList) {
      this.polygonInstanceList = <any>[];
    }

    this.getAMap().then(AMap => {
      const map: any = this.getMapInstance(this.mid);
      // 如果已经有 polygon 实例，清除所有实例
      this.removeEvents();
      const options = this.getPolygonOptions();
      options.forEach(option => {
        const polygon = new AMap.Polygon({ ...option, map });
        events.forEach(evnet => {
          polygon.on(evnet, this.handleEvents);
        });
        polygon.dataOptions = option;
        this.polygonInstanceList.push(polygon);
      });
    });
  }

  public removeEvents(): void {
    const map: any = this.getMapInstance(this.mid);
    if (this.polygonInstanceList.length) {
      this.polygonInstanceList.forEach((instance: any) => {
        events.forEach(evnet => {
          instance.off(evnet, this.handleEvents);
        });
      });
      map.remove(this.polygonInstanceList);
      this.polygonInstanceList = [];
    }
  }

  public getPolygonOptions(): Array<any> {
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

    const polygonOptions = <any>[];
    options.forEach((option, index) => {
      const mergeOption = {
        path: path[index],
        bubble,
        extData,
        draggable,
        fillColor,
        fillOpacity: "#000",
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
    return polygonOptions;
  }

  public handleEvents(event: any): void {
    this.$emit(event.type, event);
  }

  public render(): null {
    return null;
  }
}