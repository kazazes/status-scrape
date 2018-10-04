import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "active",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    }
  ]
});
