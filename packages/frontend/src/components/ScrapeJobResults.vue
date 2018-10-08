<template>
  <v-layout row>
    <v-flex xs-12>
      <v-card>
        <v-card-title class="py-0">
          <v-text-field
            small
            v-model="search"
            prepend-icon="fa-search"
            label="Search"
            single-line
            hide-details
            clearable
            clear-icon="fas fa-times"
            class="mt-0 pt-0"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="statusScrapeResults"
          :loading="job.status === 'RUNNING' || jobLoading"
          :rows-per-page-items="
      [50,{'text':'$vuetify.dataIterator.rowsPerPageAll','value':-1}]"
          class="scrape-results-table"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs">{{ props.item.component }}</td>
            <td class="text-xs">{{ props.item.category }}</td>
            <td class="text-xs">{{ props.item.status }}</td>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { StatusScrapeJob } from "@status-scrape/prisma";
  import { JOB_RESULTS } from "../graphql/Queries";

  @Component({
    name: "ScrapeJobResults",
    components: {},
    data: () => {
      return {
        search: "",
        jobLoading: false,
        headers: [
          {
            text: "Component",
            value: "component",
            sortable: true,
          },
          {
            text: "Category",
            value: "category",
            sortable: true,
          },
          {
            text: "Status",
            value: "status",
            sortable: true,
          },
        ],
      };
    },
    props: {
      job: Object as () => StatusScrapeJob,
    },
    apollo: {
      statusScrapeResults: {
        query: JOB_RESULTS,
        pollInterval: 2000,
        loadingKey: "jobLoading",
        fetchPolicy: "cache-and-network",
        variables() {
          return {
            where: { scrape: { id: this.job.id } },
          };
        },
      },
    },
  })
  export default class ScrapeJobResults extends Vue {}
</script>
