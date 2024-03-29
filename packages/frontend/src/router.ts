import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import Targets from "./components/Targets.vue";
import Target from "./components/Target.vue";
import App from "./App.vue";
import TargetsList from "./components/TargetsList.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "active",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "app",
      component: App
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "dashboard",
      redirect: "/dashboard/target",
      component: Dashboard,
      children: [
        {
          path: "target",
          redirect: "target/all",
          name: "targets",
          component: Targets,
          children: [
            {
              path: "all",
              component: TargetsList,
              name: "allTargets"
            },
            {
              path: ":target",
              component: Target,
              name: "target"
            }
          ]
        }
      ]
    }
  ]
});
