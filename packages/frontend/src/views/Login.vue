<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary" class="text-xs-center">
                                <v-toolbar-title>Status Scrape</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="fa-user" name="login" label="Login" type="text"></v-text-field>
                                    <v-text-field id="password" prepend-icon="fa-lock" name="password" label="Password" type="password"></v-text-field>
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
    @Component({
      data: () => ({
        drawer: null
      }),
      props: {
        source: String
      }
    })
    export default class Login extends Vue {}
</script>
