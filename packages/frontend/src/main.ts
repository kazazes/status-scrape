import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "font-awesome/css/font-awesome.min.css";
import "@/vendor/bootstrap/bootstrap.scss";
import "mdbvue/build/css/mdb.css";

Vue.config.productionTip = false;

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
});
