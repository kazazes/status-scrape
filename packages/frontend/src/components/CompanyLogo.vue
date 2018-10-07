<template>
  <img :src="clearbitUrl" class="company-logo">
</template>
<style lang="scss" scoped>
  .company-logo {
    padding: 3px;
    border: 1px solid #b0bec5;
  }
</style>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({
    name: "CompanyLogo",
    data: () => {
      return {};
    },
    props: {
      companyUrl: String,
    },
    computed: {
      clearbitUrl() {
        return `//logo.clearbit.com/${this.$props.companyUrl}`;
      },
    },
  })
  export default class CompanyLogo extends Vue {}
</script>
