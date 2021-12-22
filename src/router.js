import Vue from "vue";
import Router from "vue-router";
import Success from "@/views/Success";
import Cancel from "@/views/Cancel";
import Checkout from "@/views/Checkout";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "checkout",
      component: Checkout
    },
    {
      path: "/success",
      name: "success",
      component: Success
    },
    {
      path: "/cancel",
      name: "cancel",
      component: Cancel
    },
    { path: "*", redirect: "/" }
  ]
});
