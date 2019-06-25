import AMap from "./index.vue";

AMap.install = function(Vue: any): void {
  Vue.component(AMap.name, AMap);
};

export default AMap;
