import Vue from "vue";
import Router from "vue-router";
import Checkout from "@/views/Checkout";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "checkout",
      component: Checkout
    },
    { path: "*", redirect: "/" }
  ]
});
