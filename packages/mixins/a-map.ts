import { Component, Prop, Vue } from "vue-property-decorator";

import { mapLoader } from "packages/utils/map-loader";
import MapRegistry from "packages/utils/map-instance-registry";

const registry = MapRegistry.getRegistryInstance();

@Component
export default class AMapMixin extends Vue {
  @Prop() public mid!: string | number;

  public getMapInstance(mid?: string | number) {
    return registry.getMap(mid ? mid : this.mid);
  }

  public setMapInstance(mid: string | number, instance: any): any {
    registry.setMap(mid, instance);
  }

  public getAMap(): Promise<any> {
    return mapLoader();
  }
}
