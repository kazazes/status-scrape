<template>
    <v-app id="inspire" dark>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary" class="text-xs-center">
                                <v-toolbar-title>Status Scrape</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form method="POST" @submit.prevent="login">
                                    <v-text-field
                                        v-model="email"
                                        prepend-icon="fa-user"
                                        name="login"
                                        label="Login"
                                        type="text"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="password"
                                        id="password"
                                        prepend-icon="fa-lock"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        required
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions class="text-align-center">
                                <v-spacer></v-spacer>
                                <v-btn color="primary">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { mutations, APOLLO_TOKEN } from "../constants";

    @Component({
      name: "Login",
      props: {
        source: String,
      },
      components: {},
    })
    export default class Login extends Vue {
      private email: string = "";
      private password: string = "";
      private name: string = "";
      private async login() {
        try {
          const response = await this.$apollo.mutate({
            mutation: mutations.LOGIN,
            variables: {
              email: this.email,
              password: this.password,
            },
          });

          localStorage.setItem(APOLLO_TOKEN, response.data.login.token);
          this.$router.replace("/");
        } catch (e) {
          console.error(e);
        }
      }
    }
</script>
