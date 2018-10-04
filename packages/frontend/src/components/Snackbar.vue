<template>
  <v-snackbar v-model="show">
    {{message}}
    <v-btn flat color="accent" @click.native="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({
    name: "Snackbar",
    components: {},
    data: () => {
      return {
        show: false,
        message: "",
      };
    },
  })
  export default class Snackbar extends Vue {}
</script>
