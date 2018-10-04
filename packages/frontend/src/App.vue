<template>
  <v-app dark>
    <Snackbar/>
    <Dashboard v-if="isAuthenticated"/>
    <Login v-else/>
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import Dashboard from "./views/Dashboard.vue";
  import Snackbar from "./components/Snackbar.vue";
  import Login from "./views/Login.vue";
  import { APOLLO_TOKEN } from "./constants";

  @Component({
    name: "App",
    components: {
      Dashboard,
      Login,
      Snackbar,
    },
    data: () => {
      return {
        isAuthenticated: !!localStorage.getItem(APOLLO_TOKEN),
      };
    },
  })
  export default class App extends Vue {
    public logout() {
      localStorage.removeItem(APOLLO_TOKEN);
      this.$router.replace("/");
    }
  }
</script>
