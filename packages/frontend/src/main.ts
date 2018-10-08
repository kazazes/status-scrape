import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import router from "./router";
import store from "./plugins/vuex";
import App from "./App.vue";
import { createProvider } from "./plugins/vue-apollo";
import moment from "moment";

import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
