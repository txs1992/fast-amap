import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as FastAMap from "../packages/index";

FastAMap.mapOptions.setOptions({
  key: "d2d76e2274bf5973ecfb1f68454b6f3b",
  version: "1.4.15"
});

Vue.use(FastAMap.install);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
