<template>
  <v-layout row>
    <v-flex xs-12>
      <v-progress-linear v-if="statusScrapeJobs.length === 0" :indeterminate="true" class="mt-0"></v-progress-linear>
      <v-subheader>Scrapes</v-subheader>
      <v-expansion-panel light expand>
        <v-expansion-panel-content
          v-for="(job, index) in statusScrapeJobs"
          :key="index"
          :value="index === 0"
        >
          <div slot="header">{{ moment(job.updatedAt).format('LLLL') }}</div>
          <v-card class="pa-0">
            <v-card-text class="px-0 pt-1">
              <ScrapeJobResults :job="job"/>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { StatusScrapeTarget } from "@status-scrape/prisma";
  import { TARGET_JOBS } from "../graphql/Queries";
  import ScrapeJobResults from "./ScrapeJobResults.vue";

  @Component({
    name: "ScrapesList",
    components: { ScrapeJobResults },
    data: () => {
      return {
        statusScrapeJobs: [],
      };
    },
    props: {
      target: Object as () => StatusScrapeTarget,
    },
    apollo: {
      statusScrapeJobs: {
        query: TARGET_JOBS,
        pollInterval: 2000,
        variables() {
          return {
            where: { target: { id: this.target.id } },
          };
        },
      },
    },
  })
  export default class ScrapesList extends Vue {}
</script>
