import mapLoader, { mapOptionLoader } from "./utils/map-loader";
import MapOptions from "packages/utils/map-options";

import MapRegistry from "packages/utils/map-instance-registry";

import FastMap from "./components/map/index";

function install(Vue: any): void {
  [FastMap].forEach(cpt => cpt.install(Vue));
}

const registry = MapRegistry.getRegistryInstance();

const mapOptions = MapOptions.getOptionsInstance();

export { install, registry, mapOptions, mapLoader, mapOptionLoader };
