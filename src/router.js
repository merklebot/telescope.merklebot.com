import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Success from "@/views/Success";
import Cancel from "@/views/Cancel";
import Checkout from "@/views/Checkout";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/checkout",
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
