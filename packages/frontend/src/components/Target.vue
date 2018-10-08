<template>
  <v-layout row>
    <v-flex xs-12>
      <v-card v-if="target">
        <v-card-title class="blue-grey lighten-2">
          <div class="v-avatar mr-2" style="height: 40px; width: 40px;">
            <CompanyLogo :companyUrl="target.companyUrl"/>
          </div>
          <h3 class="headline white--text">{{ target.name }}</h3>
          <v-spacer/>
          <v-btn
            icon
            fab
            small
            color="blue"
            :href="'https://twitter.com/' + target.twitterHandle"
            target="_blank"
          >
            <v-icon small>fab fa-twitter</v-icon>
          </v-btn>
          <v-btn icon fab small color="green" :href="target.statusUrl" target="_blank">
            <v-icon small>fa-link</v-icon>
          </v-btn>
          <v-btn small color="text--white" @click="$apollo.queries.startScrape.start()">Scrape Now</v-btn>
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
  import { TARGET, SCRAPE } from "../graphql/Queries";
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
      startScrape: {
        query: SCRAPE,
        pollInterval: 0,
        variables() {
          return { target: { id: this.$route.params.target } };
        },
        skip: true,
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
