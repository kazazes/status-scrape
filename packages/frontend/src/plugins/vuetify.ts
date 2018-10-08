import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.lighten3,
    secondary: colors.green.base,
    accent: colors.blue.accent2,
    error: colors.red.lighten1,
    info: colors.teal.lighten1,
    success: colors.green.lighten3,
    warning: colors.yellow.lighten1
  },
  icons: {
    sort: "fas fa-arrow-up ml-1"
  },
  iconfont: "fa"
});
