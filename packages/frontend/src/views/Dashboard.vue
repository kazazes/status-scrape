<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      width="230"
      fixed
      app
    >
      <v-list>
        <template v-for="(item, index) in items">
          <v-divider v-if="item.divider" :key="index"></v-divider>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" :to="item.path">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue-grey darken-2" app fixed>
      <v-container fluid class="pa-0">
        <v-layout row justify-space-between align-center fill-height class="mt-0">
          <v-flex xs-2>
            <v-toolbar-title class="ml-0">
              <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            </v-toolbar-title>
          </v-flex>
          <v-flex xs-4>
            <!-- <v-text-field
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="fa-search "
              label="Search"
              class="hidden-sm-and-down"
            ></v-text-field>-->
          </v-flex>
          <v-flex xs-4>
            <v-menu offset-y style="float: right;">
              <v-btn slot="activator" color="primary" dark>{{ me.name }}</v-btn>
              <v-list light dense subheader>
                <v-list-tile @click="$emit('logout')">
                  <v-list-tile-title>Logout</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-btn icon style="float: right;">
              <v-icon>fa-bell</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-toolbar>
    <v-content>
      <slot name="loading"></slot>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="secondary"
      dark
      fixed
      @click="$refs.addTargetDialog.toggleDialog()"
    >
      <v-icon>fa-plus</v-icon>
    </v-btn>
    <AddTargetDialog ref="addTargetDialog"/>
  </v-app>
</template>
<script lang="ts">
  import Component from "vue-class-component";
  import Vue from "vue";
  import { ME } from "../graphql/Queries";
  import { ApolloQueryResult, ApolloError } from "apollo-client";
  import { IMe } from "../store/me";
  import AddTargetDialog from "../components/AddTargetDialog.vue";

  @Component({
    name: "Dashboard",
    components: { AddTargetDialog },
    data: () => ({
      me: { name: "" },
      dialog: false,
      drawer: null,
      items: [
        { icon: "fa-bullseye", text: "Targets", path: "/dashboard/target" },
        { divider: true },
        { icon: "fa-cogs", text: "Run" },
        { icon: "fa-calendar", text: "Schedule" },
        { icon: "fa-map", text: "Strategies" },
        { divider: true },
        { icon: "fa-user-friends", text: "Users" },
        { icon: "fa-wrench", text: "Settings" },
        { icon: "fa-question", text: "Help" },
      ],
    }),
    props: {
      source: String,
    },
    apollo: {
      me: {
        query: ME,
        name: "me",
        fetchPolicy: "no-cache",
        result(result: ApolloQueryResult<any>) {
          console.log(`Hi ${result.data.me.name}!`);
          const me: IMe = {
            name: result.data.me.name,
            email: result.data.me.email,
          };
          this.$store.commit("setMe", me);
        },
        pollInterval: 30000,
        error(e: ApolloError) {
          if (e.graphQLErrors && e.graphQLErrors.length > 0) {
            this.$emit("logout");
          }
        },
      },
    },
  })
  export default class Dashboard extends Vue {}
</script>
