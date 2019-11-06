import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.css";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: "#96A281",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c"
      }
    }

    // dark: {
    //   primary: "#96A281",
    //   secondary: "#b0bec5",
    //   accent: "#8c9eff",
    //   error: "#b71c1c"
    // }
  }
});

export default vuetify;
