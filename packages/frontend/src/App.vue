<template>
  <v-app>
    <!-- <Dashboard /> -->
    <Login />
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import Dashboard from "./views/Dashboard.vue";
  import Login from "./views/Login.vue";

  @Component({
    name: "App",
    components: {
      Dashboard,
      Login
    }
  })
  export default class App extends Vue {}
</script>
