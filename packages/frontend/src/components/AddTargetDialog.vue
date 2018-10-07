<template>
  <v-layout row justify-center v-if="dialog">
    <v-dialog v-model="dialog" persistent max-width="700px">
      <v-card light>
        <v-card-title class="headline grey lighten-2" primary-title>
          <span class="headline">Add Target</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap="">
              <v-flex
                xs12
                v-if="errors.length > 0"
                v-for="(error, index) in errors"
                :key="'error-'+index"
              >
                <v-alert type="error" :value="true">{{ error }}</v-alert>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Company Name" required v-model="name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Status Page" required v-model="statusUrl"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Homepage" required v-model="companyUrl"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  prepend-inner-icon="fas fa-at"
                  label="Twitter Handle"
                  v-model="twitterHandle"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select
                  disabled
                  :items="['statuspage.io']"
                  label="Type"
                  required
                  v-model="strategy"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addTarget">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { UPSERT_TARGET } from "../graphql/Mutations";
  import validator from "validator";
  import { Prop } from "vue-property-decorator";

  @Component({
    name: "AddTargetDialog",
    components: {},
  })
  export default class AddTargetDialog extends Vue {
    public name = "";
    public twitterHandle = "";
    public statusUrl = "";
    public companyUrl = "";
    public strategy = "statuspage.io";
    public errors: string[] = [];
    public dialog: boolean = false;

    public toggleDialog() {
      this.name = "";
      this.statusUrl = "";
      this.companyUrl = "";
      this.twitterHandle = "";
      this.dialog = !this.dialog;
    }

    private validateDialog() {
      this.errors = [];
      if (!validator.isURL(this.companyUrl)) {
        this.errors.push("Company URL must be a url");
      }

      if (!validator.isURL(this.statusUrl)) {
        this.errors.push("Status URL must be a url");
      }

      if (validator.isEmpty(this.name)) {
        this.errors.push("Company name is required");
      }

      if (validator.isEmpty(this.twitterHandle)) {
        this.errors.push("Twitter handle is required");
      }

      if (this.errors.length === 0) {
        this.statusUrl = this.statusUrl.replace(/^(https?:|)\/\//, "");
        this.companyUrl = this.companyUrl.replace(/^(https?:|)\/\//, "");
        this.twitterHandle = this.twitterHandle.replace("@", "");
        return true;
      } else {
        return false;
      }
    }

    private async addTarget() {
      const valid = this.validateDialog();
      if (!valid) {
        return;
      }

      const result = await this.$apollo
        .mutate({
          mutation: UPSERT_TARGET,
          variables: {
            name: this.name,
            statusUrl: this.statusUrl,
            companyUrl: this.companyUrl,
            twitterHandle: this.twitterHandle,
            strategy: "STATUSPAGE_IO",
          },
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }
</script>
