import Vue from "vue";
import Vuex from "vuex";
import snackbar from "../store/snackbar";
import me from "../store/me";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    snackbar,
    me
  }
});

export default store;
