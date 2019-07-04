import FastPolygon from "./polygon.ts";

FastPolygon.install = function(Vue: any): void {
  Vue.component(FastPolygon.name, FastPolygon);
};

export default FastPolygon;
