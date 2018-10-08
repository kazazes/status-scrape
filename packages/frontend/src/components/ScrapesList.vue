<template>
  <v-layout row>
    <v-flex xs-12>
      <v-subheader>Scrapes</v-subheader>
      <v-expansion-panel light expand>
        <v-expansion-panel-content
          v-for="(job, index) in statusScrapeJobs"
          :key="index"
          :value="index === 0"
        >
          <div slot="header">{{ moment(job.updatedAt).format('LLL')}}</div>
          <v-card>
            <v-card-text>
              <pre>
                {{ JSON.stringify(job, null, 2)}}
              </pre>
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

  @Component({
    name: "ScrapesList",
    components: {},
    data: () => {
      return {};
    },
    props: {
      target: Object as () => StatusScrapeTarget,
    },
    apollo: {
      statusScrapeJobs: {
        query: TARGET_JOBS,
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
