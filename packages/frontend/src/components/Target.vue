<template>
  <v-layout row>
    <v-flex xs-12>
      <v-card>
        <v-card-title class="blue-grey lighten-2">
          <div class="v-avatar mr-2" style="height: 40px; width: 40px;">
            <CompanyLogo :companyUrl="target.companyUrl"/>
          </div>
          <h3 class="headline white--text">{{ target.name }}</h3>
        </v-card-title>
        <v-card-text>
          <ScrapesList :target="target"/>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { TARGET } from "../graphql/Queries";
  import CompanyLogo from "./CompanyLogo.vue";
  import { VueApolloComponentOption } from "vue-apollo/types/options";
  import ScrapesList from "./ScrapesList.vue";

  @Component({
    name: "Target",
    components: { CompanyLogo, ScrapesList },
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
