import FastMap from "./components/map/index";
import FastPolygons from "./components/polygons/index";

import MapOptions from "packages/utils/map-options";
import mapLoader, { mapOptionLoader } from "./utils/map-loader";
import MapRegistry from "packages/utils/map-instance-registry";

function install(Vue: any): void {
  [FastMap, FastPolygons].forEach(cpt => cpt.install(Vue));
}

const registry = MapRegistry.getRegistryInstance();

const mapOptions = MapOptions.getOptionsInstance();

export { install, registry, mapOptions, mapLoader, mapOptionLoader };
