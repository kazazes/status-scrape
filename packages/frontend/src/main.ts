import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import { createProvider } from "./plugins/vue-apollo";

import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
