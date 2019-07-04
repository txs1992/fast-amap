import { warn } from "packages/utils/utils";

/**
 * 高德地图实例注册表
 */
export default class MapRegistry {
  private static registryInstance: MapRegistry;
  private constructor() {}
  private registry = new Map<string | number, Object>();

  public setMap(mid: number | string, instance: Object) {
    if (!mid) {
      warn("The parameter mid cannot be empty");
    }
    if (this.registry.get(mid)) {
      warn(`mid: ${mid} already exists in the map registry`);
    } else {
      this.registry.set(mid, instance);
    }
  }

  public getMap(mid: number | string) {
    return this.registry.get(mid);
  }

  public deleteMap(mid: number | string) {
    if (this.getMap(mid)) {
      this.registry.delete(mid);
    } else {
      warn(`No instance of mid: ${mid} found in the map registry`);
    }
  }

  public static getRegistryInstance() {
    if (!MapRegistry.registryInstance) {
      MapRegistry.registryInstance = new MapRegistry();
    }

    return MapRegistry.registryInstance;
  }
}
