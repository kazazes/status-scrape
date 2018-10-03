import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard.vue";
import Profile from "@/components/Profile.vue";
import Tables from "@/components/Tables.vue";
import Maps from "@/components/Maps.vue";
import BadGateway from "@/components/BadGateway.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      props: { page: 1 },
      alias: "/",
    },
    {
      path: "/profile",
      name: "Profile",
      props: { page: 2 },
      component: Profile,
    },
    {
      path: "/tables",
      name: "Tables",
      props: { page: 3 },
      component: Tables,
    },
    {
      path: "/maps",
      name: "Maps",
      props: { page: 4 },
      component: Maps,
    },
    {
      path: "/404",
      name: "BadGateway",
      props: { page: 5 },
      component: BadGateway,
    },
    {
      path: "*",
      props: { page: 5 },
      redirect: "/404",
    },
  ],
});
