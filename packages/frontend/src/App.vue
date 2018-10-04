<template>
  <v-app dark>
    <Dashboard v-if="isAuthenticated" />
    <Login v-else />
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import Dashboard from "./views/Dashboard.vue";
  import Login from "./views/Login.vue";
  import { APOLLO_TOKEN } from "./constants";

  @Component({
    name: "App",
    components: {
      Dashboard,
      Login
    },
    data: () => {
      return {
        isAuthenticated: !!localStorage.getItem(APOLLO_TOKEN),
      };
    },
  })
  export default class App extends Vue {
    public logout () {
      localStorage.removeItem(APOLLO_TOKEN);
      this.$router.replace("/");
    }
  }
</script>
