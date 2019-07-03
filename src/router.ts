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
      path: "/polygons",
      name: "Polygons",
      component: () => import("./views/Polygons.vue")
    }
  ]
});
