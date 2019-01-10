import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";
import socketIO from "vue-socket.io";
import VTooltip from "v-tooltip";

Vue.config.productionTip = false;
Vue.use(socketIO, "http://localhost:3000", store);
Vue.use(VTooltip);

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
