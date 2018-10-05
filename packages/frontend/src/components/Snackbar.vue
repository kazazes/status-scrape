<template>
  <v-snackbar
    v-model="show"
    :timeout="timeout"
    :color="color"
    :top="position === 'top'"
    :bottom="position === 'bottom'"
  >
    {{message}}
    <!-- <v-btn flat color="accent" @click.native="show = false">Close</v-btn> -->
  </v-snackbar>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({
    name: "Snackbar",
    components: {},
    computed: {
      message() {
        return this.$store.getters.message;
      },
      color() {
        return this.$store.getters.color;
      },
      position() {
        return this.$store.getters.position;
      },
      timeout() {
        return this.$store.getters.timeout;
      },
      show: {
        get() {
          return this.$store.getters.show;
        },
        set(show: boolean) {
          this.$store.commit("setShow", show);
        },
      },
    },
  })
  export default class Snackbar extends Vue {}
</script>
