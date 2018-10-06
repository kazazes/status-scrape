<template>
  <v-app dark>
    <Snackbar/>
    <router-view v-on:logout="logout"></router-view>
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
  })
  export default class App extends Vue {
    private isAuthenticated: boolean = !!localStorage.getItem(APOLLO_TOKEN);
    public logout() {
      localStorage.removeItem(APOLLO_TOKEN);
      this.$router.push("/login");
    }

    public mounted() {
      if (this.isAuthenticated) {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/login");
      }
    }
  }
</script>
