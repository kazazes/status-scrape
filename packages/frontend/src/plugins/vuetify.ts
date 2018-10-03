import Vue from "vue";
import Vuetify from "vuetify/es5/components/Vuetify";
import VApp from "vuetify/es5/components/VApp";
import VNavigationDrawer from "vuetify/es5/components/VNavigationDrawer";
import VFooter from "vuetify/es5/components/VFooter";
import VList from "vuetify/es5/components/VList";
import VBtn from "vuetify/es5/components/VBtn";
import VIcon from "vuetify/es5/components/VIcon";
import VGrid from "vuetify/es5/components/VGrid";
import VToolbar from "vuetify/es5/components/VToolbar";
import transitions from "vuetify/es5/components/transitions";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  },
  iconfont: "fa",
});
