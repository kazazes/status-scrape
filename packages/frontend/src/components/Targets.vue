<template>
  <v-layout row>
    <v-flex xs-12>
      <v-list light subheader two-line>
        <v-subheader>Targets</v-subheader>
        <v-divider></v-divider>
        <template v-for="(target, index) in listTargets">
          <v-list-tile :key="target.name" avatar :to="'/dashboard/targets/' + target.name" ripple>
            <v-list-tile-avatar>
              <CompanyLogo :companyUrl="target.companyUrl"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ target.name }}</v-list-tile-title>
              <v-list-tile-sub-title>
                Last scraped:
                <span>{{ moment(target.results[0].updatedAt).format('LLL') }}</span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon>
                <v-icon small v-if="target.results[0].status === 'DONE'" color="success">fa-circle</v-icon>
                <v-icon
                  small
                  v-else-if="target.results[0].status === 'RUNNING'"
                  color="warning"
                >fa-circle</v-icon>
                <v-icon
                  small
                  v-else-if="target.results[0].status === 'FAILED' || target.results[0].status === 'TIMED_OUT'"
                  color="error"
                >fa-circle</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="index < listTargets.length - 1" :key="index"></v-divider>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { TARGETS } from "../graphql/Queries";
  import CompanyLogo from "./CompanyLogo.vue";

  @Component({
    name: "Target",
    components: { CompanyLogo },
    data: () => {
      return {};
    },
    apollo: {
      listTargets: {
        query: TARGETS,
        pollInterval: 2000,
      },
    },
  })
  export default class Target extends Vue {}
</script>
