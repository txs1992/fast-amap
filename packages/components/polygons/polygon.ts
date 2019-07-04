import cloneDeep from "lodash.clonedeep";
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator";

import { noop } from "packages/utils/utils";
import events from "./events";
import AMapMixin from "packages/mixins/a-map";
import AMapPropMixin from "packages/mixins/poly-prop";

let polygonInstanceList = <any>[];

@Component
export default class FastPolygons extends Mixins(AMapMixin, AMapPropMixin) {
  public name: string;

  constructor(props: any) {
    super(props);
    this.name = "FastPolygons";
  }

  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  polygons!: Array<any>;

  @Prop(Function) beforeCreatePolygon!: Function;
  @Prop({ type: String, default: "#FFAAA00" }) fillColor!: string;
  @Prop({ type: Number, default: 0.9 }) fillOpacity!: number;

  public beforeDestroy(): void {
    this.removeEvents();
  }

  @Watch("polygons", { immediate: true, deep: true })
  handlePolygonsChange(polygons: any): void {
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
        polygonInstanceList.push(polygon);
      });
    });
  }

  public removeEvents(): void {
    const map: any = this.getMapInstance(this.mid);
    if (polygonInstanceList.length) {
      polygonInstanceList.forEach((instance: any) => {
        events.forEach(evnet => {
          instance.off(evnet, this.handleEvents);
        });
      });
      map.remove(polygonInstanceList);
      polygonInstanceList = [];
    }
  }

  public getPolygonOptions(): Array<any> {
    const {
      path,
      bubble,
      zIndex,
      extData,
      polygons,
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
    polygons.forEach((polygon, index) => {
      const option = {
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
        ...polygon
      };
      const polygonOption = beforeCreatePolygon
        ? beforeCreatePolygon(option, index)
        : option;
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
