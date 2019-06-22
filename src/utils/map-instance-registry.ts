/* 高德地图实例注册表 */

interface MapInstanceRegistryInterface {
  register(mid: number | string, instance: Object): void;
  getMap(mid: number | string): any;
}

export default class MapInstanceRegistry
  implements MapInstanceRegistryInterface {
  private static registryInstance: MapInstanceRegistry;
  private constructor() {}
  private registry = new Map<string | number, Object>();

  public register(mid: number | string, instance: Object) {
    if (this.registry.get(mid)) {
      throw new Error(`mid: ${mid} already exists in the map registry`);
    } else {
      this.registry.set(mid, instance);
    }
  }

  public getMap(mid: number | string) {
    return this.registry.get(mid);
  }

  public static getRegistryInstance() {
    if (!MapInstanceRegistry.registryInstance) {
      MapInstanceRegistry.registryInstance = new MapInstanceRegistry();
    }

    return MapInstanceRegistry.registryInstance;
  }
}
