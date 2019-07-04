import FastPolygon from "./polygon";

FastPolygon.install = function(Vue: any): void {
  Vue.component(FastPolygon.name, FastPolygon);
};

export default FastPolygon;
