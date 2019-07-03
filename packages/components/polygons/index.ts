import FastPolygons from "./polygons.vue";

FastPolygons.install = function(Vue: any): void {
  Vue.component(FastPolygons.name, FastPolygons);
};

export default FastPolygons;
