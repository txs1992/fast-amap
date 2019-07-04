import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "AMap",
      component: () => import("./views/AMap.vue")
    },
    {
      path: "/polygon",
      name: "Polygon",
      component: () => import("./views/Polygon.vue")
    }
  ]
});
