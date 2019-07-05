import { warn } from './utils'
import Map from './map-shim'

/**
 * 高德地图实例注册表
 */
export default class MapRegistry {
  constructor() {
    this.registry = null
  }

  setMap(mid, instance) {
    if (!mid) {
      warn('The parameter mid cannot be empty')
    }
    if (this.map) {
      if (this.map.get(mid)) {
        warn(`mid: ${mid} already exists in the map registry`)
      } else {
        this.map.set(mid, instance)
      }
    }
  }

  getMap(mid) {
    return this.map && this.map.get(mid)
  }

  deleteMap(mid) {
    if (this.getMap(mid)) {
      this.map.delete(mid)
    } else {
      warn(`No instance of mid: ${mid} found in the map registry`)
    }
  }

  static getRegistryInstance() {
    if (!this.registry) {
      this.registry = new MapRegistry()
      this.registry.map = new Map()
    }

    return this.registry
  }
}
