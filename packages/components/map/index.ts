import FastMap from "./index.vue";

FastMap.install = function(Vue: any): void {
  Vue.component(FastMap.name, FastMap);
};

export default FastMap;
