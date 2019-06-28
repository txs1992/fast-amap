import Vue from "vue";
import Component from "vue-class-component";

import { mapLoader } from "packages/utils/map-loader";
import MapRegistry from "packages/utils/map-instance-registry";

const registry = MapRegistry.getRegistryInstance();

@Component
export default class AMapMixin extends Vue {
  public getMapInstance(mid: string | number) {
    return registry.getMap(mid);
  }

  public setMapInstance(mid: string | number, instance: any): any {
    registry.setMap(mid, instance);
  }

  public getAMap(): Promise<any> {
    return mapLoader();
  }
}
