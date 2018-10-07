<template>
  <v-layout row>
    <v-flex xs-12>
      <pre>
        {{ JSON.stringify(target,null, 2)}}
      </pre>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { TARGET } from "../graphql/Queries";
  import CompanyLogo from "./CompanyLogo.vue";
  import { VueApolloComponentOption } from "vue-apollo/types/options";
  import { StatusScrapeTarget } from "@status-scrape/prisma";

  @Component({
    name: "Target",
    components: { CompanyLogo },
    data() {
      return { targetId: String };
    },
    apollo: {
      target: {
        query: TARGET,
        variables() {
          return { target: { id: this.$route.params.target } };
        },
      },
    },
  })
  export default class Target extends Vue {
    private targetId = "";

    public async mounted() {
      this.targetId = this.$route.params.target;
    }
  }
</script>
